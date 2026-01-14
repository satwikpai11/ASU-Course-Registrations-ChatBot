# ASU Course Registrations ChatBot

The ASU Course Registrations ChatBot is a conversational assistant designed to help students query and explore Arizona State University course registration information using natural language.  
The chatbot processes user queries, interprets intent, and retrieves relevant course data from a structured dataset.

This project demonstrates applied natural language processing, intent handling, and chatbot based information retrieval for academic course systems.

---

## Features

### Natural language course queries
- Supports conversational queries related to ASU course registration
- Interprets user intent to identify relevant course information
- Handles common student queries such as course availability and registration related questions

### Dataset driven responses
- Uses a structured dataset containing ASU course registration information
- Maps user queries to dataset fields to retrieve accurate responses
- Ensures consistent and repeatable outputs based on available data

### Modular chatbot architecture
- Clean separation between data loading, query processing, and response generation
- Designed for easy extension to support additional intents or datasets
- Suitable for academic and prototype deployment scenarios

---

## Technology Stack

- **Programming Language**: Python
- **Chatbot Logic**: Rule based intent handling
- **Data Handling**: CSV based course dataset
- **Environment**: Local execution
- **IDE**: VS Code or any Python supported IDE

---

## Repository Structure

ASU-Course-Registrations-ChatBot-main/
data/
courses.csv
chatbot.py
requirements.txt
README.md

---

## How the ChatBot Works

1. The user enters a course related question in natural language
2. The chatbot preprocesses the input text
3. Intent is identified using rule based logic
4. Relevant course information is extracted from the dataset
5. A formatted response is returned to the user

---

## Getting Started

### Prerequisites
- Python 3.8 or later
- pip package manager

### Installation

1. Clone the repository
   git clone https://github.com/yourusername/ASU-Course-Registrations-ChatBot.git

	2.	Navigate to the project directory

cd ASU-Course-Registrations-ChatBot-main
	3.	Install dependencies

pip install -r requirements.txt



⸻

Running the ChatBot

Execute the chatbot script using:

python chatbot.py

Once running, you can enter course related questions directly in the terminal.

⸻

Example Queries
	•	What courses are available for CSE this semester
	•	Show me information about EEE courses
	•	Is a specific course open for registration

⸻
