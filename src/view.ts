import * as vscode from 'vscode';
import * as cowsay from 'cowsay';
import { get as getProvider } from './provider';
const name: string = getProvider('cowsay')[0];
export class ReminderView {
  public static showOutput(say: string = '代码写久了，喝杯水休息一下~') {
    const uri = vscode.Uri.parse(`${name}: ${say}`);

    // 创建面板
    const outputChannel = vscode.window.createOutputChannel('water');
    //  清空当前output面板
    outputChannel.clear();
    outputChannel.append(cowsay.say({ text: uri.path, r: true }));
    outputChannel.show();
  }
}
