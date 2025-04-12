import pandas as pd

def clean_user_data(data):

    required_fields = ["employee_id", "username", "password", "userlevel"]
    
    # Check for missing fields
    for field in required_fields:
        if field not in data:
            return f"Missing required field: {field}"
    
    # Convert data to a pandas DataFrame for cleaning
    df = pd.DataFrame([data])
    # Example cleaning: Strip whitespace from string fields
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    # Convert cleaned DataFrame back to a dictionary
    cleaned_data = df.to_dict(orient="records")[0]
    return cleaned_data

def clean_database_data(data):
    
    if not data:
        return []

    # Convert data to a pandas DataFrame for cleaning
    df = pd.DataFrame(data)
    # Example cleaning: Strip whitespace from string fields
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    # Convert cleaned DataFrame back to a list of dictionaries
    cleaned_data = df.to_dict(orient="records")
    return cleaned_data
