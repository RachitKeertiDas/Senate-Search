from PyPDF2 import PdfReader
import re


class SenateMinutes:
    def __init__(self, filepath, senate_number):
        self.filepath = filepath
        self.senate_number = senate_number
        self.proposals = []

    def print(self):
        for i in range(len(self.proposals)):
            print("========================================")
            proposal_id, proposal, resolution = (
                self.proposals[i]["proposal_id"],
                self.proposals[i]["proposal"],
                self.proposals[i]["resolution"],
            )
            print(f"{proposal_id} {proposal}")
            print(f"\nResolution: {resolution}")

    # Extract the text from the PDF filepath
    def extract(self):
        reader = PdfReader(self.filepath)

        self.raw_text = ""
        for i in range(len(reader.pages)):
            page = reader.pages[i]
            # To handle members in attendance
            if "Appendix ‘A’" in page.extract_text() and i != 0:
                break
            self.raw_text += page.extract_text()

        # Search for proposals and resolutions
        # Proposal Form: A-50.2.3(2)(a)
        # Resolution Form: Senate Resolution on item A -50.2.3(2)(a)
        proposal_regex = f"(?:A-{self.senate_number})(?:\s?\.[0-9]+)+(?:\s?\([0-9]+\))?(?:\s?\([a-zA-Z]\))*"
        resolution_regex = f"(?:Senate Resolution on item A -{self.senate_number})(?:\s?\.[0-9]+)+(?:\s?\([0-9]+\))?(?:\s?\([a-zA-Z]\))*"
        split_regex = f"({proposal_regex}|{resolution_regex})"
        x = re.split(split_regex, self.raw_text)

        knt = 1
        while knt < len(x):
            current_proposal_id, current_proposal, current_resolution = None, None, None

            # Store the current proposal
            if knt + 1 >= len(x):
                break
            current_proposal_id = x[knt]
            current_proposal = x[knt + 1]

            knt += 2
            # Store the resolution. Store Nil if the resolution is unavailable
            if knt + 1 >= len(x):
                current_resolution = "Nil"
                self.proposals.append(
                    {
                        "proposal_id": current_proposal_id,
                        "proposal": current_proposal.strip(),
                        "resolution": current_resolution,
                    }
                )
                break

            if "senate resolution" not in x[knt].lower():
                current_resolution = "Nil"
                self.proposals.append(
                    {
                        "proposal_id": current_proposal_id,
                        "proposal": current_proposal.strip(),
                        "resolution": current_resolution,
                    }
                )
                continue

            if knt + 2 >= len(x):
                current_resolution = x[knt + 1]
                self.proposals.append(
                    {
                        "proposal_id": current_proposal_id,
                        "proposal": current_proposal.strip(),
                        "resolution": current_resolution[1:].strip(),
                    }
                )
                break

            # Handle the case where there are many subproposals i.e. many consecutive resolutions
            # are seen before the next proposal
            while knt + 2 < len(x) and "senate resolution" in x[knt + 2].lower():
                # Obtain the proposal number in the resolution i.e. A-50.2.3(2)(b)
                prop_number = re.search(
                    f"(?:A -{self.senate_number})(?:\s?\.[0-9]+)+(?:\s?\([0-9]+\))?(?:\s?\([a-zA-Z]\))*",
                    x[knt],
                ).group(0)

                # If this is the first subproposal i.e. A-50.2.1, A-51.4.1
                if (
                    len(re.findall("\.", prop_number)) == 1
                    and re.findall("\([0-9]+\)", prop_number) == 0
                    and re.findall("\([a-zA-Z]\)", prop_number) == 0
                ):
                    sub_prop_number = 1
                else:
                    letter_flag = False
                    y = None

                    # Check if the subproposal is an alphabet i.e. A-50.2.3(a), A-47.4.1(b)
                    if re.search("\([a-zA-Z]\)", prop_number) is not None:
                        letter_flag = True
                        sub_prop_number = re.search("\([a-zA-Z]\)", prop_number).group(
                            0
                        )[1:-1]
                        sub_prop_number = chr(ord(sub_prop_number) + 1)

                    # If it is a letter, find the next letter, and find where the next subproposal begins using this
                    if letter_flag:
                        y = re.split(f"(\n{sub_prop_number}\))", x[knt + 1])
                        if len(y) == 1:
                            y = re.split(
                                f"(\n{sub_prop_number}\.)", x[knt + 1])
                        if len(y) == 1:
                            sub_prop_number = int(
                                re.search("(\d+)(?!.*\d)",
                                          prop_number).group(0)
                            )
                            sub_prop_number += 1
                            y = re.split(
                                f"(\n{sub_prop_number}\))", x[knt + 1])
                    else:
                        # If it is a number, find the next number, and find where the next subproposal begins using this
                        sub_prop_number = int(
                            re.search("(\d+)(?!.*\d)", prop_number).group(0)
                        )
                        sub_prop_number += 1
                        y = re.split(f"(\n{sub_prop_number}\))", x[knt + 1])

                        # If this number does not exist, indicates that the overall proposal (A-50.2, A-51.3) ends here
                        if len(y) == 1:
                            current_proposal_id = re.search(
                                f"(?:A -{self.senate_number})(?:\s?\.[0-9]+)+(?:\s?\([0-9]+\))?(?:\s?\([a-zA-Z]\))*",
                                x[knt],
                            ).group(0)
                            current_resolution = x[knt + 1]
                            self.proposals.append(
                                {
                                    "proposal_id": current_proposal_id,
                                    "proposal": current_proposal.strip(),
                                    "resolution": current_resolution[1:].strip(),
                                }
                            )
                            knt += 2
                            break

                # Append the current proposal-resolution pair
                current_proposal_id = re.search(
                    f"(?:A -{self.senate_number})(?:\s?\.[0-9]+)+(?:\s?\([0-9]+\))?(?:\s?\([a-zA-Z]\))*",
                    x[knt],
                ).group(0)
                current_resolution = y[0]
                self.proposals.append(
                    {
                        "proposal_id": current_proposal_id,
                        "proposal": current_proposal.strip(),
                        "resolution": current_resolution[1:].strip(),
                    }
                )
                if len(y) == 1:
                    current_proposal = "Nil"
                else:
                    current_proposal = y[2]
                knt += 2
            else:
                # If there are no subproposals or if they have ended, append the final proposal-resolution pair
                current_proposal_id = re.search(
                    f"(?:A -{self.senate_number})(?:\s?\.[0-9]+)+(?:\s?\([0-9]+\))?(?:\s?\([a-zA-Z]\))*",
                    x[knt],
                ).group(0)
                current_resolution = x[knt + 1]
                self.proposals.append(
                    {
                        "proposal_id": current_proposal_id,
                        "proposal": current_proposal.strip(),
                        "resolution": current_resolution[1:].strip(),
                    }
                )
                knt += 2
