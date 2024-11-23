"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

export function Convertor_in_posttopre() {
  const [state, setState] = useState<string>("");
  const [result, setResult] = useState<string>("No results found!");

  const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  // function solveInfix(infix: string) {
  //   const precedence = {
  //     "+": 1,
  //     "-": 1,
  //     "*": 2,
  //     "/": 2,
  //     "^": 3,
  //   };

  //   const isOperand = (c: string): boolean => c.match(/[a-z0-9]/i) !== null;
  //   const isOperator = (c: string): boolean =>
  //     ["+", "-", "*", "/", "^"].includes(c);
  //   const output = [];
  //   const stack = [];

  //   for (let i = 0; i < infix.length; i++) {
  //     const char = infix[i];

  //     // If the character is an operand, add it to the output
  //     if (isOperand(char)) {
  //       output.push(char);
  //     }
  //     // If the character is '(', push it to the stack
  //     else if (char == "(") {
  //       stack.push(char);
  //     }
  //     // If the character is an operator
  //     else if (isOperator(char)) {
  //       while (
  //         stack.length &&
  //         precedence[stack[stack.length - 1] as keyof typeof precedence] >=
  //           precedence[char as keyof typeof precedence]
  //       ) {
  //         output.push(stack.pop());
  //       }

  //       stack.push(char);
  //     }
  //     // If the character is ')', pop from the stack to the output until '(' is encountered
  //     else if (char == ")") {
  //       while (stack.length != 0 && stack[stack.length - 1] != "(") {
  //         output.push(stack.pop());
  //       }
  //       stack.pop(); // Remove '(' from the stack
  //     }
  //     // If the character is an operator
  //     else if (isOperator(char)) {
  //       while (
  //         stack.length !== 0 &&
  //         precedence[stack[stack.length - 1] as keyof typeof precedence] >=
  //           precedence[char as keyof typeof precedence]
  //       ) {
  //         output.push(stack.pop());
  //       }

  //       stack.push(char);
  //     }
  //   }
  //   while (stack.length) {
  //     output.push(stack.pop());
  //   }

  //   setResult(output.join(" "));
  // }

  // const convert = (e: React.FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   solveInfix(state);
  // };

  // const [prompt, setPrompt] = useState(""); // Store input from the user
  // const [response, setResponse] = useState(""); // Store the GPT response
  // const [loading, setLoading] = useState(false); // Show loading state
  const [error, setError] = useState(""); // Store any error

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // setLoading(true);
    setError(""); // Clear previous errors
    // setResponse(""); // Clear previous response

    const prompt = `Convert the following postfix expression ${state} to prefix expression the response should be in json string format and contains isValid which has boolean value , next the prefix expression and finally the error message if any. DO NOT USE MARKDOWN SYNTAX NO PREAMBLE ONLY STRING`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await res.json();
      const generateText = JSON.parse(data.response);

      if (res.ok) {
        const resultJson = await generateText.candidates[0].content.parts[0]
          .text;
          // console.log(resultJson)
          
              const resultData = JSON.parse(
                resultJson
              );
              console.log(resultData);
        if (resultData.isValid) {
          setResult(resultData.prefixExpression);
        } else setError(resultData.errorMessage);
        // setResult(generateText.candidates[0].content.parts[0].text); // Set the GPT response
      } else {
        // Check if error is an object, and extract the message
        // const errorMessage =
        //   typeof data.error === 'object'
        //     ? data.error.message || JSON.stringify(data.error)
        //     : data.error;

        setError("An error occurred.");
      }
    } catch (err) {
      setError("Failed to fetch data." + err);
    } finally {
      // setLoading(false);
    }
  };
console.log(result)
  return (
    <div className="pt-8">
      <div className="flex flex-col gap-4 shadow-xl p-4 rounded-md border-gray-100 border-4 w-[400px]">
        <h1 className="mt-4 text-xl font-bold">Postfix to Prefix</h1>
        <Input
          onChange={setData}
          value={state}
          className="text-lg"
          placeholder="Postfix Converter"
          type="text"
        />
        <textarea
          value={error}
          disabled
          className=" my-1  py-2 px-2 rounded-md text-xl font-medium w-full border-0 border-dashed border-purple-700 text-red-600"
        />

        <Button
          type="submit"
          onClick={(e) => handleClick(e)}
          className="py-6 w-3/6"
        >
          Convert
        </Button>
        <h1 className="mt-4 text-xl">Results :</h1>
        <textarea
          name="postfix"
          value={result}
          disabled
          className=" my-1  py-2 px-2 rounded-md text-xl font-medium w-full border-0 border-dashed border-purple-700 text-grey-800"
        />
      </div>
    </div>
  );
}
