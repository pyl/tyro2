import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def classify_activity(activity_description, goal):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Is {activity_description} productive towards {goal}? Return yes or no.",
            }
        ],
        model="gpt-3.5-turbo",
        max_tokens=50
    )
    
    return True if chat_completion.choices[0].message.content.strip() == "Yes" else False
