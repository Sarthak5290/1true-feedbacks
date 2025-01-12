# 🥷 Anonymous Feedback Application

This is a **Next.js** application designed to allow users to receive anonymous feedback. It uses the **Google Gemini API** to generate message suggestions and **Resend API** for handling email communications.

## Features

- **Anonymous Feedback**: Users can send feedback anonymously.
- **Message Suggestions**: The app uses the Google Gemini API to provide message suggestions.

## Limitations

- **API Cost**: The current live project is limited by the cost associated with using certain APIs (Google Gemini and Resend). The application is designed to work with minimal usage due to these constraints. However, the features are implemented and can be used if you have the respective API keys.
- **Single User**: Only one user can sign up and use the application. This is due to API key restrictions where the email associated with the API key can only be used.
- **Message Suggestions**: As the Google Gemini API key incurs costs, you can't get suggestions in the live link of this project. However, the feature is implemented and can be used if you have the Google Gemini API key.

## Setup

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sarthak5290/1true-feedbacks.git
   ```
2. **Install dependencies**:
   ```bash
   cd 1true-feedbacks
   npm install
   ```
3. **Set up environment variables**:

   Create a `.env` file in the root of your project and add your API keys:
   RESEND_API_KEY=your_resend_api_key GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key

4. **Run the development server**:

```bash
npm run dev
```

5. **Open the application**:

Visit `http://localhost:3000` in your browser to see the application in action.

## Usage

1. **Sign Up**: Sign up using the email associated with the Resend API key.
2. **Receive Feedback**: Share the link to your feedback form to receive anonymous feedback.
3. **Message Suggestions**: Utilize the AI-generated message suggestions from Google Gemini to craft responses.

## Future Enhancements

- **Multi-User Support**: Implementing multi-user support when API cost limitations are resolved.
- **Enhanced Feedback Options**: Expanding feedback mechanisms beyond text-based inputs.
- **Improved UI/UX**: Making the application more user-friendly.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
