export class Application {
	private _clipboard: string;
	private _text: string;
	private _commandHistory: UndoableCommand[] = [];
	private _undidCommandHistory: UndoableCommand[] = [];
	private _recording: null | CommandRecord = null;
	private _isInRecording = false;


	public executeCommand(command: Command) {
		console.log(`⌛️ Executed command`);
		if (command instanceof UndoableCommand) {
			console.log(`Command saved to history`);
			this._commandHistory.push(command);
			console.log(this._isInRecording);
			console.log(this._recording);
			if (this._isInRecording && this._recording !== null) {
				console.log('Command added to recording');
				this._recording.addCommand(command);
			}
		}
		command.execute();
	}

	public containsRecording(): boolean {
		return this._recording !== null && !this._isInRecording;
	}

	get text(): string {
		return this._text;
	}

	get isInRecording(): boolean{
		return this._isInRecording;
	}

	set isInRecording(value: boolean) {
		this._isInRecording = value;
	}

	get commandHistory(): UndoableCommand[] {
		return this._commandHistory;
	}

	get undidCommandHistory(): UndoableCommand[] {
		return this._undidCommandHistory;
	}

	get recording(): CommandRecord | null {
		return this._recording;
	}

	set recording(value: CommandRecord | null) {
		this._recording = value;
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

export abstract class UndoableCommand extends Command {
	get backup(): string {
		return this._backup;
	}

	private readonly _backup: string;

	protected constructor(application: Application) {
		super(application);
		this._backup = application.text;
	}
}

export abstract class UndoableCommandWithSelection extends UndoableCommand {

	protected constructor(application: Application, protected startIndex: number, protected endIndex: number) {
		super(application);
	}
}

export class CommandRecord {
	public commands: UndoableCommand[] = [];

	public addCommand(command: UndoableCommand) {
		this.commands.push(command);
	}

	constructor() {
	}
}
