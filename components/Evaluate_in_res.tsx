"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

export function Evaluate_in_res() {
  const [state, setState] = useState<string>("");
  const [result, setResult] = useState<number>(0.0);

  const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  function Evaluate(str :string[]) : void{

    let a: number, b: number, c: number;
    const stack: number[] = [];

    for(let i=0;i<str.length;i++){

        if (str[i].localeCompare("+") === 0) {
            a = stack.pop()!;
            b = stack.pop()!;
            c = b + a;  // Be mindful of the order in subtraction/division
            stack.push(c);
        } else if (str[i].localeCompare("-") === 0) {
            a = stack.pop()!;
            b = stack.pop()!;
            c = b - a;  // subtract from correct order that is top -(top-1)
            stack.push(c);
        } else if (str[i].localeCompare("*") === 0) {
            a = stack.pop()!;
            b = stack.pop()!;
            c = b * a;
            stack.push(c);
        } else if (str[i].localeCompare("/") === 0) {
            a = stack.pop()!;
            b = stack.pop()!;
            c = b / a;   // divide to correct order that is top /(top-1)
            stack.push(c);
        } else {
            // convert string to float and  store into the stack.
            stack.push(parseFloat(str[i]));
        }

    }
    setResult(stack[stack.length-1]);


  }
  
    

  

  function solveInfix(infix :string) {
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "^": 3,
    };

    const isOperand = (c: string): boolean => c.match(/[a-z0-9]/i) !== null;
    const isOperator = (c: string): boolean =>
      ["+", "-", "*", "/", "^"].includes(c);
    const output = [];
    const stack = [];

    for (let i = 0; i < infix.length; i++) {
      const char = infix[i];

      // If the character is an operand, add it to the output
      if (isOperand(char)) {
        output.push(char);
      }
      // If the character is '(', push it to the stack
      else if (char == "(") {
        stack.push(char);
      }
      // If the character is an operator
      else if (isOperator(char)) {
        while (
          stack.length &&
          precedence[stack[stack.length - 1] as keyof typeof precedence] >=
            precedence[char as keyof typeof precedence]
        ) {
          output.push(stack.pop());
        }

        stack.push(char);
      }
      // If the character is ')', pop from the stack to the output until '(' is encountered
      else if (char == ")") {
        while (stack.length != 0 && stack[stack.length - 1] != "(") {
          output.push(stack.pop());
        }
        stack.pop(); // Remove '(' from the stack
      }
      // If the character is an operator
      else if (isOperator(char)) {
        while (
          stack.length !== 0 &&
          precedence[stack[stack.length - 1] as keyof typeof precedence] >=
            precedence[char as keyof typeof precedence]
        ) {
          output.push(stack.pop());
        }

        stack.push(char);
      }
    }
    while (stack.length) {
      output.push(stack.pop());
    }

    Evaluate(output);


    
  }

  const convert = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    solveInfix(state);
  };

  return (
    <div className="pt-8">
      <form onClick={convert} className="flex flex-col gap-4">
        <Input type="text" onChange={setData} value={state} className="text-lg" placeholder="Infix  Evaluator"   />
        <Button type="submit" className="py-6 w-3/6" >Evaluate</Button>
      </form>
      <h1 className="mt-4 text-xl">Results</h1>
      <input
          type="text"
          name="postfix"
          value={result}
          disabled
          className="h-16 my-3  py-2 px-3 rounded-md text-xl font-medium w-full border-0 border-dashed border-purple-700 text-gray-500"
        />
      
    </div>
  );
}
