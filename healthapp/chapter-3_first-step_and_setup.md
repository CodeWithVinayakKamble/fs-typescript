# setup

1. npm init for package.json in empty folder

2. npm install --save-dev typescript

3. configure package.json {"type:"commonjs" -> "module"}, script {"tsc": "tsc"}
   - The **--noEmit** option\*\* tells the TypeScript compiler not to generate JavaScript output. It runs type checking only, without generating compiled file.

---

4. npm run tsc file.ts

5. add **configuration file tsconfig.json**

```js
{
  "compilerOptions":{
    "noImplicitAny": false,
    "noEmit": true
  }
}
```

## Why do we want this ("noEmit":teur)? => If you run tsc without noEmit, TypeScript will generate a compiled .js file right next to every .ts file you write:

- index.ts ➡️ generates index.js
- multiplier.ts ➡️ generates multiplier.js

- You use tsc purely as a quality checker to see if there are any red-line errors

## 2. "noImplicitAny": false (The "Training Wheels")

- To understand this, you need to know what **any** is.

- In TypeScript, any is the **"magic wild-card"** type. If a variable is typed as any, TypeScript completely turns off its brain and says: **"Whatever, do whatever you want, I won't check this."**

- Now, what does "Implicit" mean? "Implicit" means accidental / unspoken.

```js
function multiply(a, b) {
  return a * b;
}
```

- You didn't give a or b any types!

- If **"noImplicitAny": true** (Strict Production Mode) : TypeScript throws a red line immediately: ❌ "Parameter 'a' implicitly has an 'any' type! You forgot to label it, **and I refuse to let you be lazy**!"

- If **"noImplicitAny": false** (The Course's Starting Mode): TypeScript puts on training wheels: ✅ "Okay, you didn't give me a type, so I will quietly assume any and I won't shout at you with red lines yet."

- **npm run tsc multiplier.ts**

---

## Accessing command line arguments

> What Does Node Actually Put in process.argv?

- When you type this in your terminal:
  - npm run multiply 5 2

* Node.js automatically creates an array called process.argv. Look at what is inside that array:

```
| Index     | What is inside?             | Example Value |
| :---:     |:---------------:            |:-------------:|
| `args[0]` | Path to the Node executable | `C:\Program Files\nodejs\node.exe` |
| `args[1]` | Path to your script file    | `C:\...\multiplier.ts` |
| `args[2]` | Your FIRST real argument!   | `"5"` |
| `args[3]` | Your SECOND real argument!  | `"2"` |
```

- 👉 Indices [0] and [1] are reserved by Node for system paths!
  - Your actual inputs from the terminal always start at Index [2].

- Why !isNaN(Number(args[2]))?? -> Anything you type into a terminal prompt is always a string:

- Why interface MultiplyValues?

```typescript
interface MultiplyValues {
  value1: number;
  value2: number;
}
```

- This is the TypeScript contract.

- It guarantees that parseArguments will never return random garbage. It promises:
  - "If this function succeeds, it will return an object with two clean numbers called value1 and value2."

## interface vs type (What Is the Difference?)

- Both of them are used to label your data, but they specialize in different things:

* A. interface = The Blueprint for an OBJECT
  - Whenever you want to describe the shape of a JavaScript Object, interface is the gold standard:

```ts
// interface describes the properties an OBJECT must have
interface MultiplyValues {
  value1: number;
  value2: number;
}
```

- B. type = The Master of UNIONS and Shortcuts
  - You cannot do a union of words with an interface. That's where type shines:

```ts
// type can define a choice between values (Union)
type Operation = "multiply" | "add" | "divide";
```

## confusions and its solution

- interface MultiplyValues{}:

1. It is a **"Type Declaration Block"**, NOT a JavaScript Object

```ts
// interface describes the properties an OBJECT must have
interface MultiplyValues {
  value1: number;
  value2: number;
}
```

1. The Input Rule: (args: string[])

```ts
const parseArguments = (args: string[]): MultiplyValues => {};
```

- Anything coming from the terminal (process.argv) is raw text (strings).
  **args: string[] declares the rule**: "This function ONLY accepts an array of strings (string[]). If anyone tries to pass numbers or an object into parseArguments(), reject it immediately!"

---

2. The Output Rule: : MultiplyValues

- This is the return contract.
- **It tells TypeScript**: "I promise that whenever this function finishes, it will spit out an object matching the MultiplyValues blueprint ({ value1: number, value2: number })."

---

## any vs unknown — What's the Difference?

- Both allow you to pass anything in ("hello", 42, null, objects). The difference is what TypeScript lets you do afterward:

- any = "Turn off TypeScript completely" 🔓
  TypeScript stops checking everything on that variable. You can call x.fakeMethod() and TS won't warn you—it just crashes at runtime.

- unknown = "Accept anything, but check it before touching it" 🔒
  TypeScript says: "Fine, hold anything in here, but you aren't allowed to call .toUpperCase() or .message until you narrow it with if (typeof ...) or if (... instanceof ...)!"

---

## Express TypeScript with HTTP requests.

- CompilerOptions for **ts** Configure the **tsconfig.ts**

```ts
{
  "compilerOptions": {
    "noImplicitAny": false,
    "noEmit": true,
    "types": ["node"],
    "target": "esnext",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "module": "nodenext",
    "esModuleInterop": true,
    "allowImportingTsExtensions": true
  }
}
```

- npm install express
- npm install --save-dev @types/express // for labeled express thing and ts need will know all things about ex.
- npm install --save-day concurrently

