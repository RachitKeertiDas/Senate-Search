from PyPDF2 import PdfReader
import re

# TODO: Handle Annexures
# TODO: Standardized file names
# TODO: Handle members in attendance
# TODO: Resolution when they are interspersed
# TODO: Handling page breaks (might've been handled, check code to verify)
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
            self.raw_text += page.extract_text()

        proposal_regex = f"A-{self.senate_number}[\.0-9]+[\(a-z\)]*"
        resolution_regex = f"Senate Resolution on item A -{self.senate_number}[\.0-9]+[\(a-z\)]*:"
        split_regex = f'({proposal_regex}|{resolution_regex})'
        x = re.split(split_regex, self.raw_text)

        knt = 1
        while knt < len(x):
            if knt + 1 >= len(x):
                break
            self.proposals.append(f"{x[knt]} {x[knt + 1]}")

            knt += 2
            if knt >= len(x):
                self.resolutions.append('Nil')
                break

            resolution_string = ''
            while knt < len(x) and 'senate resolution' in x[knt].lower():
                if knt + 1 >= len(x):
                    resolution_string = f'{x[knt]} Nil'
                    break

                resolution_string += f'{x[knt]} {x[knt + 1]}'
                knt += 2

            self.resolutions.append(resolution_string)


filepath_49 = "../../../Minutes/49th Senate/Minutes of 49th Senate meeting.pdf"
minutes_49 = SenateMinutes(filepath=filepath_49, senate_number=49)
minutes_49.extract()

filepath_47 = '../../../Minutes/47th Senate/47th Senate Meeting-Section A Minutes-final-converted.pdf'
minutes_47 = SenateMinutes(filepath=filepath_47, senate_number=47)
minutes_47.extract()
