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

	constructor() {
		this._clipboard = '';
		this._text = '';
	}
}

export abstract class Command {
	protected application: Application;

	abstract execute(): void;

	protected constructor(application: Application) {
		this.application = application;
	}
}

export abstract class CommandWithSelection extends Command {
	protected startIndex: number;
	protected endIndex: number;

	protected constructor(application: Application, startIndex: number, endIndex: number) {
		super(application);
		this.startIndex = startIndex;
		this.endIndex = endIndex;
	}
}
