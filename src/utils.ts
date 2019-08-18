import * as vscode from 'vscode';
import { extensionName } from './config';

/**
 * 工具类
 */
export default class Utils {
  /**
   * 获取插件配置
   */
  public static getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(extensionName);
  }

  /**
   * 展示信息
   * @param title  标题
   * @param content 内容
   */
  public static showInformationMessage(title: string, content: string) {
    return vscode.window.showInformationMessage(content, { title });
  }

  /**
   * 重新加载窗口
   */
  public static reloadWindow() {
    return vscode.commands.executeCommand('workbench.action.reloadWindow');
  }
}
