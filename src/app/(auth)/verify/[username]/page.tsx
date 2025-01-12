"use client"
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/app/types/apiResponse";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Correct import
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyAccount = () => {
  const router = useRouter(); // Correct API
  const params = useParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
    
  

      const response = await axios.post<ApiResponse>("/api/verifyCode", {
        username: params.username,
        code: data.code,
      });


  
      console.log("Response received:", response);
  
      toast({
        title: "Success",
        description: response.data.message,
      });
  
      router.push("/sign-in"); // Navigate to sign-in
    } catch (error) {
      console.error("Error verifying code:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
      }
  
      toast({
        title: "Error",
        description: "An error occurred while verifying your account.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              id="code"
              {...form.register("code")}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your verification code"
            />
            {form.formState.errors.code && (
              <p className="mt-2 text-sm text-red-600">{form.formState.errors.code.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
