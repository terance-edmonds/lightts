import { ASCII_LOGO } from '../config';
import { printLogo } from '../utils/lightts';
import { generateESLint } from './generators/eslint';
import { initGitRepo } from './generators/git';
import { generateHusky } from './generators/husky';
import { configureLightTS } from './generators/lightts';
import { generatePackageJson, installDependencies } from './generators/package-json';
import { generatePrettier } from './generators/prettier';
import { generateTSConfig } from './generators/tsconfig';
import { prompts } from './prompts';
import { generateTemplate } from './templates';

export const init = async () => {
    const data = await prompts();

    generatePackageJson(data);
    installDependencies(data);
    configureLightTS(data);
    generateTemplate(data);
    generateTSConfig();
    initGitRepo();

    if (data.lintConfigs.includes('prettier')) {
        generatePrettier();
    }

    if (data.lintConfigs.includes('eslint')) {
        generateESLint();
    }

    if (data.lintConfigs.includes('husky')) {
        generateHusky(data.pkg);
    }

    printLogo();
    console.log('{ Happy Coding with LightTs! }');
};
