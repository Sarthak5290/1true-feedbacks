"use client";

import { useCallback, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  Copy,
  RefreshCcw,
  Trash2,
  ToggleRight,
  ToggleLeft,
  Link as LinkIcon,
  MessageCircle,
  Settings,
  ExternalLink,
} from "lucide-react";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);

  // Existing callback functions remain the same
  const fetchAcceptingStatus = useCallback(async () => {
    try {
      const response = await axios.get("/api/accept-messages");
      if (response.data.success) {
        setIsAcceptingMessages(response.data.isAcceptingMessages);
      } else {
        toast.error(response.data.message || "Failed to fetch status");
      }
    } catch (error) {
      toast.error(`Error fetching status: ${(error as AxiosError).message}`);
    }
  }, []);

  const toggleAcceptMessages = async () => {
    try {
      const newStatus = !isAcceptingMessages;
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: newStatus,
      });

      if (response.data.success) {
        setIsAcceptingMessages(newStatus);
        toast.success(
          `Message acceptance turned ${newStatus ? "on" : "off"} successfully!`
        );
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(`Error toggling status: ${(error as AxiosError).message}`);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get("/api/getMessages");
      if (response.data.success) {
        setMessages(response.data.messages);
      } else {
        toast.error(response.data.message || "Failed to fetch messages");
      }
    } catch (error) {
      toast.error(`Error fetching messages: ${(error as AxiosError).message}`);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && !initialLoadDone) {
      fetchMessages();
      fetchAcceptingStatus();
      setInitialLoadDone(true);
    }
  }, [status, router, fetchMessages, fetchAcceptingStatus, initialLoadDone]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const uniqueLink = session?.user?.username
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.user.username}`
    : "#";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(uniqueLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy link: " + err.message);
      });
  };

  const deleteMessage = async (messageId: string) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this message?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            toast.info("Deleting message...");
            try {
              const response = await axios.delete("/api/deleteMessage", {
                data: { username: session?.user?.username, messageId },
              });

              if (response.data.success) {
                setMessages((prevMessages) =>
                  prevMessages.filter(
                    (message) => message._id.toString() !== messageId
                  )
                );
                toast.success("Message deleted successfully");
              } else {
                toast.error(
                  response.data.message || "Failed to delete message"
                );
              }
            } catch (error) {
              toast.error(
                `Error deleting message: ${(error as AxiosError).message}`
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Message deletion canceled."),
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-6 h-6 text-blue-500" />
              <CardTitle>Your Unique Link</CardTitle>
            </div>
            <CardDescription>
              Share this link to receive messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <a
                href={uniqueLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 flex items-center group flex-1 truncate"
              >
                <span className="truncate">{uniqueLink}</span>
                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-gray-500" />
              <CardTitle>Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={toggleAcceptMessages}
              variant={isAcceptingMessages ? "default" : "outline"}
              className="w-full"
            >
              {isAcceptingMessages ? (
                <ToggleRight className="w-5 h-5 mr-2 text-green-400" />
              ) : (
                <ToggleLeft className="w-5 h-5 mr-2 text-red-400" />
              )}
              Accept Messages: {isAcceptingMessages ? "On" : "Off"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-gray-500" />
                <CardTitle>Messages</CardTitle>
              </div>
              <Button
                onClick={fetchMessages}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-gray-500" />
            <CardTitle>Message History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {messages.map((message) => (
                <Card key={message._id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <p className="text-gray-800">{message.content}</p>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {new Date(message.createdAt).toLocaleString()}
                        </Badge>
                        <Button
                          onClick={() => deleteMessage(message._id)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default Page;
