import readline from "readline";
import colors from "colors";
import path from "path";
import inquirer from "inquirer";
import fsp from "fs/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
const root = process.cwd();

const findFilesDir = (dirName) => {
    return fsp
        .readdir(dirName)
        .then((choices) => {
            return inquirer.prompt([
                {
                    name: "fileName",
                    type: "list",
                    message: "Choose file",
                    choices,
                },
                {
                    name: "findString",
                    type: "input",
                    message: "Enter something for search",
                },
            ])
        })
        .then(async ({ fileName, findString }) => {
            const fullPath = path.join(dirName, fileName);
            const stat = await fsp.stat(fullPath);
            if (!stat.isFile()) {
                return findFilesDir(fullPath);
            }
            return Promise.all([
                fsp.readFile(path.join(dirName, fileName), "utf-8"),
                Promise.resolve(findString),
            ]);
        })
        .then((result) => {
            if (result) {
                const [text, findString] = result;
                const pattern = new RegExp(findString, "9");
                let count = 0;
                const out = text.replace(pattern, () => {
                    count++;
                    return colors.orange(findString);
                });
                console.log(out, "\n", colors.blue(`Found ${count} values`));
            }
        });
};

rl.question(
    `You are in ${root} \n Please enter the path to the directory: `,
    (dirPath) => {
        const dirName = path.join(root, dirPath);

        findFilesDir(dirName);
    }
);

rl.on("close", () => process.exit(0));

