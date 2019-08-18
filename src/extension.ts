// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cowsay from 'cowsay';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // 该命令已在package.json文件中定义
  // 现在使用registerCommand提供命令的实现
  // commandId参数必须与package.json中的命令字段匹配
  const disposable = vscode.commands.registerCommand('waterMinder.showReminderInfo', () => {
    vscode.window.showInformationMessage('代码写久了，喝杯水休息一下~', '知道了');
  });

  // register a content provider for the cowsay-scheme
  const cowsaySchemeName = 'cowsay';
  const cowsayProvider = new (class implements vscode.TextDocumentContentProvider {
    // emitter and its event
    public onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    public onDidChange = this.onDidChangeEmitter.event;

    public provideTextDocumentContent(uri: vscode.Uri): string {
      return cowsay.say({ text: uri.path, r: true });
    }
  })();

  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(cowsaySchemeName, cowsayProvider)
  );

  const testDisposable = vscode.commands.registerCommand('waterMinder.test', async () => {
    const uri = vscode.Uri.parse(`${cowsaySchemeName}: 代码写久了，喝杯水休息一下~`);
    const doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
    await vscode.window.showTextDocument(doc, { preview: false });
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(testDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('关闭');
}
