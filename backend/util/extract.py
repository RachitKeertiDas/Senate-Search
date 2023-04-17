from PyPDF2 import PdfReader
import re

# TODO: Handle Annexures
# TODO: Handle cases like A-50.1.1(a) [counterexample in A-47.4.3]
# TODO: Standardized file names
# TODO: Handle members in attendance
# TODO: Resolution when they are interspersed
# TODO: Filepaths are hardcoded for now


class SenateMinutes:
    def __init__(self, filepath, senate_number):
        self.filepath = filepath
        self.senate_number = senate_number
        self.proposals, self.resolutions = [], []

    def extract(self):
        reader = PdfReader(self.filepath)

        self.raw_text = ""
        for i in range(len(reader.pages)):
            page = reader.pages[i]
            # To handle members in attendance
            if "Appendix ‘A’" in page.extract_text() and i != 0:
                break
            self.raw_text += page.extract_text()

        proposal_regex = f"A-{self.senate_number}[\.0-9]+[\(a-z\)]*"
        resolution_regex = f"Senate Resolution on item A -{self.senate_number}[\.0-9]+[\(a-z\)]*:"
        split_regex = f'({proposal_regex}|{resolution_regex})'
        x = re.split(split_regex, self.raw_text)

        knt = 1
        while knt < len(x):
            if knt + 1 >= len(x):
                break
            # print('A', x[knt])
            self.proposals.append(f"{x[knt]} {x[knt + 1]}")

            knt += 2
            if knt + 1 >= len(x):
                self.resolutions.append('Nil')
                break

            if knt + 2 >= len(x):
                self.resolutions.append(f'{x[knt]} {x[knt + 1]}')
                break

            while 'senate resolution' in x[knt + 2].lower():
                # print('B', x[knt])
                if '14' in x[knt]:
                    self.resolutions.append(f'{x[knt]} {x[knt + 1]}')
                    break
                prop_number = re.search(
                    f'A -{self.senate_number}[\.0-9]+[\(a-z\)]*', x[knt]).group(0)
                if len(re.findall('\.', prop_number)) == 1:
                    sub_prop_number = 1
                else:
                    # if re.search('\([a-zA-Z]\)', prop_number) is not None:
                    #     print('heyyyyy', prop_number)
                    #     sub_prop_number = re.search(
                    #         '[a-zA-Z]', prop_number).group(0)
                    #     sub_prop_number = chr(ord(sub_prop_number) + 1)
                    sub_prop_number = int(re.search(
                        '(\d+)(?!.*\d)', prop_number).group(0))
                    sub_prop_number += 1
                y = re.split(f'(\n{sub_prop_number}\))', x[knt + 1])
                # TODO: Can there be multiple numbers here?
                self.resolutions.append(f'{x[knt]} {y[0]}')
                self.proposals.append(f'{y[1]} {y[2]}')
                knt += 2
            else:
                # print('C', x[knt])
                self.resolutions.append(f'{x[knt]} {x[knt + 1]}')
                knt += 2

            # resolution_string = ''
            # while knt < len(x) and 'senate resolution' in x[knt].lower():
            #     if knt + 1 >= len(x):
            #         resolution_string = f'{x[knt]}'
            #         break

            #     resolution_string += f'{x[knt]} {x[knt + 1]}'
            #     knt += 2

            # self.resolutions.append(resolution_string)
