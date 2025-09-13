# StyleXAI
StyleXAI – A smart fashion advisor that combines real-time weather data with AI styling to recommend the perfect outfit. Whether sunny, rainy, or chilly, StyleXAI keeps you looking sharp and prepared.
🌦 AI Fashion Advisor
Live Demo: https://ai-fashion-advisor-f-b1wj.bolt.host/

 The Problem :
Choosing an outfit can be a daily struggle, often influenced by unpredictable weather and personal style preferences. Existing solutions are either simple weather apps or generic fashion sites that lack personalization. Our solution bridges this gap by combining real-time weather data with a smart AI stylist.

Our Solution: AI Fashion Advisor
AI Fashion Advisor is a web application that provides personalized, weather-appropriate outfit recommendations with a virtual try-on feature. Our goal is to simplify daily dressing decisions and make online fashion discovery more interactive and personal.

Key Features:
AI Style Matcher: The app learns your personal style by having you "like" sample outfits. This unique feature goes beyond simple user input to create a dynamic style profile.
Intelligent Outfit Generation: The app uses a rule-based AI to suggest three distinct outfits based on real-time weather conditions and your inferred style preferences.
Advanced Weather Insights: Our system doesn't just use temperature. It incorporates wind speed, humidity, and a weather description to provide smarter, more practical recommendations (e.g., a windbreaker for windy days or linen for high humidity).
Virtual AR Try-On: Upload a selfie, and the app will overlay your chosen outfit to give you a realistic preview. This is the core "wow" feature that makes the experience engaging and fun.
"Shop Similar" Feature: Each recommended outfit includes a button that automatically generates a web search for similar items, demonstrating a clear path to e-commerce integration.

 Tech Stack
This project was built as a single, self-contained Python script, making it lightweight and easy to deploy.
Frontend: Streamlit, with custom CSS for a modern UI.
Backend: Python
Image Processing: Pillow (PIL Fork) for the virtual try-on feature.
Data & Assets: All images and data are embedded in the code using Base64, eliminating external dependencies.
