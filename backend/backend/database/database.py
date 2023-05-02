import json
import os


class DocumentDatabase():
    """
    Defines an abstract class that any database implementation should confirm to.
    """

    def __init__(self):
        """
        Used to init the database.
        Can be used to make sure database is booted up
        and load already existing documents etc. 
        """
        pass

    def new_minutes(self, doc, meeting_number):
        """
        Store a new document in the database.
        """
        pass

    def retrieve_minutes(self, meeting_number):
        """
        Retrieve a particular minutes document.
        Returns the document in the SenateMeeting Object format.
        """
        pass

    def update_minute(self, meeting_number, new_minutes):
        """
        Updates (Replaces) the stored minutes with the new minutes document
        """

        pass

    def retrieve_proposal(self, minute_number, proposal_id):
        """
        Retrieve a particular proposal along with it's resolution
        from a given senate meeting.

        """

    def _convert_to_obj(self, database_doc):
        """
        Internally convert to SenateMeetingFormat()
        """
        pass

    def _convert_from_obj(self, senate_meeting):
        """
        Convert from the SenateMeetingFormat
        """
        pass

    def delete_meeting(self, meeting_number):
        """
        Delete a Particular Meeting. 
        If it does not exist, raise an exception.
        """
        pass
