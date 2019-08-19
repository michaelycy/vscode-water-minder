// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import * as cowsay from 'cowsay';
import { Scheduler } from './scheduler';
// import { get as getProvider } from './provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const scheduler = new Scheduler(context);
  scheduler.start();

  // const disposable = vscode.commands.registerCommand('waterMinder.showReminderInfo', () => {
  //   vscode.window.showInformationMessage('代码写久了，喝杯水休息一下~', '知道了');
  // });

  // const [name, cowsayProvider] = getProvider('cowsay');

  // context.subscriptions.push(
  //   vscode.workspace.registerTextDocumentContentProvider(name, cowsayProvider)
  // );

  // context.subscriptions.push(disposable);
  context.subscriptions.push(scheduler.watch());
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('deactivate');
}
