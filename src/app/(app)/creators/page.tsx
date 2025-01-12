"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Users, Copy, ExternalLink, Loader2, UserCircle } from "lucide-react";

const Creators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getCreators");
      if (response.data.success) {
        setCreators(response.data.creators);
      } else {
        toast.error(response.data.message || "Failed to fetch creators");
      }
    } catch (error) {
      toast.error("Error fetching creators: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const generateUniqueLink = (username: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}`;
  };

  const copyToClipboard = async (username: string) => {
    const link = generateUniqueLink(username);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLinks({ ...copiedLinks, [username]: true });
      toast.success("Link copied to clipboard!");

      // Reset the "Copied" state after 2 seconds
      setTimeout(() => {
        setCopiedLinks({ ...copiedLinks, [username]: false });
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy link" + err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-500" />
            <CardTitle>Creators Directory</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : creators.length > 0 ? (
            <div className="space-y-4">
              {creators.map((creator: { username: string }, index: number) => (
                <div
                  key={index}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-all space-y-3 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3">
                    <UserCircle className="w-8 h-8 text-purple-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {creator.username}
                      </h3>
                      <p className="text-sm text-gray-500 truncate max-w-xs sm:max-w-md">
                        {generateUniqueLink(creator.username)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => copyToClipboard(creator.username)}
                    >
                      {copiedLinks[creator.username] ? (
                        "Copied!"
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-500 hover:text-purple-700"
                      asChild
                    >
                      <a
                        href={generateUniqueLink(creator.username)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No creators found.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Creators;
