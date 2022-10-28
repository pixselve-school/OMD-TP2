import {
	Application,
	Command, CommandRecord,
	CommandWithSelection,
	UndoableCommand,
	UndoableCommandWithSelection
} from './Application';
import { SelectionDirection, SelectionPart } from './Selection';

export class CopyCommand extends CommandWithSelection {

	constructor(application: Application, startIndex: number, endIndex: number) {
		super(application, startIndex, endIndex);
	}

	execute(): void {
		this.application.clipboard = this.application.text.slice(this.startIndex, this.endIndex);
	}
}

export class UndoCommand extends Command {

	constructor(application: Application) {
		super(application);
	}

	execute(): void {
		if (this.application.commandHistory.length > 0) {
			const command = this.application.commandHistory.pop();
			if (command) {
				this.application.text = command.backup;
				this.application.undidCommandHistory.push(command);
			}
		}
	}

}

export class RedoCommand extends Command {

	constructor(application: Application) {
		super(application);
	}

	execute(): void {
		if (this.application.undidCommandHistory.length > 0) {
			const command = this.application.undidCommandHistory.pop();
			if (command) {
				command.execute();
				this.application.commandHistory.push(command);
			}
		}
	}

}

export class StartRecordCommand extends Command {

	constructor(application: Application) {
		super(application);
	}

	execute(): void {
		this.application.isInRecording = true;
		this.application.recording = new CommandRecord();
		console.log(this.application.recording);
	}
}

export class StopRecordCommand extends Command {

	constructor(application: Application) {
		super(application);
	}

	execute(): void {
		this.application.isInRecording = false;
		console.log(this.application.recording);
	}
}

export class PlayRecordCommand extends UndoableCommand {

	constructor(application: Application) {
		super(application);
	}

	execute(): void {
		if (this.application.recording != null && !this.application.isInRecording) {

			for (let command of this.application.recording.commands) {
				Object.create(command).execute();
			}
		}
	}

}
export class CutCommand extends UndoableCommandWithSelection {

	constructor(application: Application, startIndex: number, endIndex: number) {
		super(application, startIndex, endIndex);
	}

	execute(): void {
		this.application.clipboard = this.application.text.slice(this.startIndex, this.endIndex);
		this.application.text = this.application.text.slice(0, this.startIndex) + this.application.text.slice(this.endIndex);
	}
}

export class PasteCommand extends UndoableCommandWithSelection {
	execute(): void {
		if (this.application.clipboard.length === 0) return;
		this.application.text = this.application.text.slice(0, this.startIndex) + this.application.clipboard + this.application.text.slice(this.endIndex);
	}

	constructor(application: Application, startIndex: number, endIndex: number) {
		super(application, startIndex, endIndex);
	}
}


export class ModifySelection extends Command {
	private readonly selectionPart: SelectionPart;
	private readonly direction: SelectionDirection;

	execute(): void {
		let selection = window.getSelection();
		// Move the end of the selection to the right
		if (selection) {
			let range = selection.getRangeAt(0);
			if (this.selectionPart === SelectionPart.Begin) {
				if (this.direction === SelectionDirection.Expand) {
					range.setStart(range.startContainer, range.startOffset - 1);
				} else {
					range.setStart(range.startContainer, range.startOffset + 1);
				}
			} else {
				if (this.direction === SelectionDirection.Expand) {
					range.setEnd(range.endContainer, range.endOffset + 1);
				} else {
					range.setEnd(range.endContainer, range.endOffset - 1);
				}
			}
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	constructor(application: Application, part: SelectionPart, direction: SelectionDirection) {
		super(application);
		this.selectionPart = part;
		this.direction = direction;
	}
}
