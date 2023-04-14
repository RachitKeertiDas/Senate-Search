from PyPDF2 import PdfReader
import re


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
            self.raw_text += page.extract_text()

        # TODO: Handle members in attendance
        # TODO: Resolution when they are interspersed
        # TODO: Handling page breaks

        proposal_string = f"A-{self.senate_number}[\.0-9]+[\(a-z\)]*"
        resolution_string = f"Senate Resolution on item A -{self.senate_number}[\.0-9]+[\(a-z\)]*:"
        split_string = f'({proposal_string}|{resolution_string})'
        x = re.split(split_string, self.raw_text)

        knt = 1
        while knt < len(x):
            if knt + 1 >= len(x):
                break
            self.proposals.append(f"{x[knt]} {x[knt + 1]}")

            if knt + 3 >= len(x):
                self.resolutions.append("Nil")
                break
            self.resolutions.append(x[knt + 3])

            knt += 4


filepath_49 = "./Minutes/49th Senate/Minutes of 49th Senate meeting.pdf"
minutes_49 = SenateMinutes(filepath=filepath_49, senate_number=49)
minutes_49.extract()
