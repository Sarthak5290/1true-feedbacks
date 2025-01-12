"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@react-email/components";
import { useSession } from "next-auth/react";

const UserProfilePage = () => {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<string[] | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const checkAcceptingMessages = async () => {
      try {
        console.log("Fetching user status for:", username);

        // Use the new public endpoint with username parameter
        const response = await axios.get(
          `/api/users/${username}/message-status`
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          console.log(
            "Setting isAcceptingMessages:",
            response.data.isAcceptingMessages
          );
          setIsAcceptingMessages(response.data.isAcceptingMessages);
        } else {
          toast.error(response.data.message || "Failed to fetch user status.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user status.");
        console.error(
          "Error fetching user status:",
          error 
        );
      } finally {
        console.log("Setting isLoading:", false);
        setIsLoading(false);
      }
    };

    if (username) {
      checkAcceptingMessages();
    } else {
      console.warn("Username is not defined");
    }
  }, [username]);

  // Fetch AI-generated message suggestions
  const fetchAiSuggestions = async () => {
    setIsAiLoading(true); // Set AI loading to true before starting fetch
    try {
      const response = await axios.post("/api/suggestMessage", {});
      if (response.data) {
        // Split the response text into an array of individual questions
        const questions = response.data.content.split(" I ");
        setAiSuggestions(questions); // Set AI-generated suggestions as an array
      } else {
        toast.error("Failed to fetch AI suggestions.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching AI suggestions.");
      console.error("Error:", error);
    } finally {
      setIsAiLoading(false); // Set AI loading to false after fetch
    }
  };

  // Handle inserting a suggestion into the message textarea
  const insertSuggestion = (suggestion: string) => {
    setMessage((prevMessage) => prevMessage + suggestion); // Append the suggestion to the existing message
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error("Message content cannot be empty.");
      return;
    }

    if (!isAcceptingMessages) {
      toast.error("This user is not accepting messages at the moment.");
      return;
    }

    try {
      const response = await axios.post("/api/sendMessage", {
        username,
        content: message,
      });

      if (response.data.success) {
        toast.success("Message sent successfully!");
        setMessage(""); // Clear the input field
      } else {
        toast.error(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the message.");
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-2xl font-semibold text-gray-800 mb-4">
        Public Profile
      </div>

      <div className="text-lg font-medium text-gray-700 mb-4">
        Send an anonymous message to{" "}
        <span className="font-semibold text-blue-600">@{username}</span>
      </div>

      {/* Message Acceptance Check */}
      {!isAcceptingMessages ? (
        <div className="text-lg text-red-500 font-medium mb-6">
          This user is not currently accepting messages.
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Type your anonymous message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            onClick={sendMessage}
            className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </div>
      )}

      {/* AI Suggestion Button */}
      {isAcceptingMessages && (
        <div className="text-center mt-8">
          <button
            onClick={fetchAiSuggestions}
            className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Get Message Suggestions from AI
          </button>
        </div>
      )}

      {/* Display Loading Spinner while AI Suggestions are being fetched */}
      {isAiLoading && (
        <div className="text-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-blue-600">Generating suggestions...</p>
        </div>
      )}

      {/* Display AI Suggestions */}
      {aiSuggestions && isAcceptingMessages && !isAiLoading && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            AI-Generated Suggestions:
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => insertSuggestion(suggestion)}
                className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors w-full text-left"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extra Section with Spacing and Background */}
      {!session && ( // Only show if the user is logged in
        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <div className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Want to Share More? Create Your Message Board!
          </div>
          <div className="text-center">
            <Button
              href="/sign-up"
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              Create Your Account Here
            </Button>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserProfilePage;
