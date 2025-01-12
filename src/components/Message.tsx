"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Ensure the Button component is correctly imported
import { X } from "lucide-react";
import { Message as MessageType } from "@/app/model/User.model";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/app/types/apiResponse";

type MessageCardProps = {
  message: MessageType;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast({
        title: response.data.message,
        description: "The message has been successfully deleted.",
      });
      onMessageDelete(message.id); // Delete the message from the parent component
    } catch (error) {
      toast({
        title: "Error deleting message" + error,
        description: "There was an issue while trying to delete the message.",
      });
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Card Section with Dark Theme */}
      <Card className="bg-gray-800 border border-gray-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">{message.content}</CardTitle>
            {/* Alert Dialog Inside Card Header */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="text-white">
                  <X className="w-5 h-5 text-white" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your message.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-gray-400 hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <CardDescription className="text-gray-400">
            {new Date(message.createdAt).toLocaleString()}
          </CardDescription>{" "}
          {/* Format date for better readability */}
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{message.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageCard;
