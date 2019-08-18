import * as vscode from 'vscode';
// import Asset from './asset';
const Asset = {} as any;

export class ReminderView {
  private static panel?: vscode.WebviewPanel;

  public static show(context: vscode.ExtensionContext) {
    const asset: any = new Asset(context);

    const imagePath = asset.getImageUri();
    const title = asset.getTitle();
    const content = asset.getContent();

    vscode.window.showInformationMessage('水乃生命之源', { modal: true }, '知道了');

    if (this.panel) {
      this.panel.webview.html = this.generateHtml(imagePath, title, content);
      this.panel.reveal();
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'zyl',
        '朱一龙',
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );
      this.panel.webview.html = this.generateHtml(imagePath, title, content);
      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }
  }

  protected static generateHtml(
    imagePath: vscode.Uri | string,
    title: string,
    content: string
  ): string {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>朱一龙</title>
        </head>
        <body>
            <div><h1>${title}</h1></div>
            <div>
                <p>${content}</p>
            </div>
            <div><img src="${imagePath}"></div>
        </body>
        </html>`;

    return html;
  }
}
