export class Application {
	private _clipboard: string;
	private _text: string;

	public executeCommand(command: Command) {
		console.log(`⌛️ Executed command`);
		command.execute();
	}


	get text(): string {
		return this._text;
	}

	set text(value: string) {
		this._text = value;
	}

	get clipboard(): string {
		return this._clipboard;
	}

	set clipboard(value: string) {
		this._clipboard = value;
	}


	public getSelection(textArea: HTMLDivElement): string {
		const selection = window.getSelection();
		if (selection) {
			return selection.toString();
		}
		return '';
	}

	constructor() {
		this._clipboard = '';
		this._text = '✏️ Commence ton histoire ici';
	}
}

export abstract class Command {
	private backup: string;
	protected application: Application;

	abstract execute(): void;

	protected constructor(application: Application) {
		this.backup = '';
		this.application = application;
	}
}

