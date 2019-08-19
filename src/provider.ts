import * as vscode from 'vscode';
import * as cowsay from 'cowsay';

const providerPool = {
  cowsay: [
    'cowsay',
    new (class implements vscode.TextDocumentContentProvider {
      // emitter and its event
      public onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
      public onDidChange = this.onDidChangeEmitter.event;

      public provideTextDocumentContent(uri: vscode.Uri): string {
        return cowsay.say({ text: uri.path, r: true });
      }
    })()
  ] as [string, any]
};

export function get(name: keyof typeof providerPool) {
  return providerPool[name];
}
