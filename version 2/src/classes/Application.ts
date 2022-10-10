export class Application {
	private _clipboard: string;
	private _text: string;
	private commandHistory: UndoableCommand[] = [];
	private undidCommandHistory: UndoableCommand[] = [];
	private recording: null | CommandRecord = null;
	private isInRecording = false;


	public executeCommand(command: Command) {
		console.log(`⌛️ Executed command`);
		if (command instanceof UndoableCommand) {
			console.log(`Command saved to history`);
			this.commandHistory.push(command);
			console.log(this.isInRecording);
			console.log(this.recording);
			if (this.isInRecording && this.recording !== null) {
				console.log('Command added to recording');
				this.recording.addCommand(command);
			}
		}
		command.execute();
	}

	public undoCommand() {
		if (this.commandHistory.length > 0) {
			const command = this.commandHistory.pop();
			if (command) {
				this.text = command.backup;
				this.undidCommandHistory.push(command);
			}
		}
	}

	public redoCommand() {
		if (this.undidCommandHistory.length > 0) {
			const command = this.undidCommandHistory.pop();
			if (command) {
				command.execute();
				this.commandHistory.push(command);
			}
		}
	}

	public startRecording() {

		this.isInRecording = true;
		this.recording = new CommandRecord();
		console.log(this.recording);
	}

	public stopRecording() {

		this.isInRecording = false;
		console.log(this.recording);
	}

	public playRecording() {
		console.log(this.recording);
		console.log(this.isInRecording);
		if (this.recording != null && !this.isInRecording) {

			for (let command of this.recording.commands) {
				this.executeCommand(command);
			}
		}
	}

	public containsRecording(): boolean {
		return this.recording !== null && !this.isInRecording;
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
