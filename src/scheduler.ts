import * as vscode from 'vscode';
import Utils from './utils';
import { extensionName } from './config';

const ReminderView = {} as any;

export class Scheduler {
  private workspaceConfig!: vscode.WorkspaceConfiguration;
  private context!: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.workspaceConfig = Utils.getConfiguration();
  }

  /**
   * 开始监听
   */
  public start() {
    setInterval(() => {
      ReminderView.show(this.context);
    }, 1000 * 60 * this.workspaceConfig.get<number>('reminderInterval', 60));
  }

  /**
   * 配置变更
   */
  public configurationChanged() {
    const prevConfig: vscode.WorkspaceConfiguration = this.workspaceConfig;
    const currentConfig = Utils.getConfiguration();

    // 配置值没有修改，返回
    if (JSON.stringify(prevConfig) === JSON.stringify(currentConfig)) {
      return;
    }

    this.workspaceConfig = currentConfig;

    Utils.showInformationMessage(
      'Restart vscode',
      `Extension ${extensionName} has been changed! Please restart.`
    ).then(item => {
      if (!item) {
        return;
      }

      // 重新加载窗口
      Utils.reloadWindow();
    });
  }

  /**
   * 监听 workspace config change
   */
  public watch(): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration(() => this.configurationChanged());
  }
}
