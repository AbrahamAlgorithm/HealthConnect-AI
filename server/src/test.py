from dateutil import parser
# from datetime import datetime

time = "Wed, 18 Sep 2024 23:00:00 GMT"

m = parser.parse(time).isoformat()
# # print(datetime.date())

from datetime import datetime, timezone

def parse_time(venue_time: str) -> str:
    dt = parser.parse(venue_time)  # Parse with timezone info if present
    # Convert to UTC if needed
    dt_utc = dt.astimezone(timezone.utc)
    return dt_utc.time().isoformat()

# Example usage
venue_time = "2024-09-18T23:00:00"  # Input without timezone
parsed_time = parse_time(m)
print(parsed_time)  # Should reflect local time
