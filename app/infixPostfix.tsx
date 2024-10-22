"use client";

import { useState } from "react";

const InfixPostfix = () => {
  const [state, setState] = useState<string>("");
   const [result, setResult] = useState<string>("");

  const setData = (e) => {
    // console.log(e.target.value);
    setState(e.target.value);
  }
  // const precedence=(c)=>{
  //   if(c=='^'){
  //     return 3;
  //   }else if(c=='*'||c=='/'){
  //     return 2;
  //   }else if(c=='+' || c=='-'){
  //     return -1;
  //   }else {
  //     return -1;
  //   }

  // }

  function solveInfix(infix) {
    let precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3,
    };
  
  
    const isOperand = (c) => c.match(/[a-z0-9]/i);
    const isOperator = (c) => ['+', '-', '*', '/', '^'].includes(c);
    const output = [];
    const stack = [];
  
    for (let i = 0; i < infix.length; i++) {
      const char = infix[i];
  
      // If the character is an operand, add it to the output
      if (isOperand(char)) {
        output.push(char);
      }
      // If the character is '(', push it to the stack
      else if (char == '(') {
        stack.push(char);
      }
       // If the character is an operator
       else if (isOperator(char)) {
        while ( stack.length && precedence[stack[stack.length - 1]] >= precedence[char]) {
          output.push(stack.pop());
        }
        stack.push(char);
      }
      // If the character is ')', pop from the stack to the output until '(' is encountered
      else if (char == ')') {
        while (stack.length!=0 && stack[stack.length - 1] != '(') {
          output.push(stack.pop());
        }
        stack.pop(); // Remove '(' from the stack
      }
      // If the character is an operator
      else if (isOperator(char)) {
        while ( stack.length!=0 && precedence(stack[stack.length-1] >= precedence(char)) ) {
          output.push(stack.pop());
        }
        stack.push(char);
      }
    }
    while (stack.length) {
      output.push(stack.pop());
    }
  
    setResult(output.join(' '));
  }
  

 

 
  const convert=(e)=>{
    e.preventDefault();
    solveInfix(state);
  }
  return (
    <>
    <div className="m-2">
      <h1 className="mt-10 text-2xl font-sans font-extralight">
        Converter Infix To Postfix{" "}
      </h1>
    <form onClick={convert}>
      <input
        type="text"
        name="postfix"
        id="postfix"
        value={state}
        onChange={setData}
        className="bg-slate-50 my-3 w-80 text-emerald-900 outline-0 border-0 py-2 px-3 rounded-md text-2xl"
      />
    <button className="ml-5 px-5 py-2 bg-slate-800 rounded-sm outline-0 hover:bg-sky-800 hover:translate-x-1 hover:delay-500"
     type="submit"> Convert</button>
     </form>
     <h1 className="mt-2 text-2xl font-sans font-extralight" >Postfix</h1>
     <input type="text" value={result} disabled
     className="outline-none border-0 p-2 text-2xl text-emerald-400 bg-transparent"/>
      </div>
    </> 
  );
};

export default InfixPostfix;
