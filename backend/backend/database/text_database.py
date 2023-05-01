from database import DocumentDatabase
from extract import SenateMinutes
import os
import json

class TextDatabase(DocumentDatabase):

    def __init__(self):
        self.path= './data'
        if not os.path.exists(self.path):
            os.makedirs(self.path)
            print('Created a New text database')
        else:
            print('Using already existing database')

    def new_minutes(self, doc, meeting_number):
        """
        Check if meeting already exists. 
        Otherwise, store a new meeting
        """
        # The root folder should already exist, (created during init)
        if os.path.isfile(f'{self.path}/minutes/{meeting_number}/minutes.json'):
            print('File Already Exists')
            # ideally, we should raise an exception here.
            return False
        
        try:
            meeting_dict = self._convert_from_obj(doc)
        except Exception as err:
            print('Caught Exception {err} while converting to JSON')

        # Overwrite already existing meeting file. Ideally, no meeting file should exist now.
        os.makedirs(f'{self.path}/minutes/{meeting_number}',exist_ok=True)
        with open(f'{self.path}/minutes/{meeting_number}/minutes.json','w') as outfile:
            json.dump(meeting_dict, outfile, indent=2)

        return True

    def delete_meeting(self, meeting_number):
        """
        Delete a meeting folder and all associated data.
        """
        if not os.path.exists(f'{self.path}/minutes/{meeting_number}'):
            print('Meeting Does not exist')
            return
        # Delete the folder and all it's data
        try:
            # todo: should pass excpetion handler to this
            shutil.rmtree(f'{self.path}/minutes/{meeting_number}')
        except Exception as err:
            print(f'Caught Exception {err} while deleting meeting')
        
        return

    def retrieve_minutes(self, meeting_number):
        """
        Retrieve a Particular Meeting in the object fomrat
        """
        if not os.path.exists(f'{self.path}/minutes/{meeting_number}/minutes.json'):
            print('Meeting Does not exist')
            # Should Ideally also raise an Exception
            return None

        with open(f'{self.path}/minutes/{meeting_number}/minutes.json','r') as infile:
            meeting_dict = json.load(infile)

        try:
            meeting_obj = self._convert_to_obj(meeting_dict)
        except Exception as err:
            print(f'Caught exception {err} while retrieving minute')
            return None
        
        return meeting_obj
        
    def update_meeting(self, meeting_number, new_minutes):

        if not os.path.exists(f'{self.path}/minutes/{meeting_number}/minutes.json'):
            print('Meeting Does not exist')
            # Should Ideally also raise an Exception
            return

        try:
            meeting_dict = self._convert_from_obj(doc)
        except Exception as err:
            print('Caught Exception {err} while converting to JSON')

        # todo: cleanup this and new_meeting together
        # Overwrite already existing meeting file. Ideally, no meeting file should exist now.
        with open('f{self.path}/minutes/{meeting_number}/minutes.json','w') as outfile:
            json.dump(meeting_dict, outfile, indent=2)

        pass

    def retrieve_proposal(self, minute_number, proposal_id):
        """
        Retrieve a particular proposal along with it's resolution
        from a given senate meeting.
        Currently returning a JSON of the proposal
        """
        if not os.path.exists(f'{self.path}/minutes/{meeting_number}/minutes.json'):
            print('Meeting Does not exist')
            # Should Ideally also raise an Exception
            return None

        with open(f'{self.path}/minutes/{meeting_number}/minutes.json','r') as infile:
            meeting_dict = json.load(infile)

        try:
            req_proposal = meeting_dict[proposal_id]
        except Exception as err:
            print(f'Caught Exception {err} while retrieving proposal')
            return None

        return req_proposal


    def _convert_to_obj(self, database_doc):
        """
        Internally convert to SenateMinutes() Format
        """
        # proposal_list = database_doc.keys()
        senate_obj = SenateMinutes(4, 'test')
        for key,value in database_doc.items():
            senate_obj.proposals.append(value)
        
        return senate_obj

    def _convert_from_obj(self, senate_meeting):
        """
        Convert from the SenateMeetingFormat
        """
        meeting_dict = {}
        for each in senate_meeting.proposals:
            # todo: check for unique proposals
            prop_id = each['proposal_id']
            meeting_dict[prop_id] = each

        return meeting_dict

db = TextDatabase()
minutes = db.retrieve_minutes(47)
print(minutes)

