import { DraggableNode } from './draggableNode';
import { 
  ArrowRightToLine, 
  BrainCircuit, 
  ArrowLeftToLine, 
  Type, 
  Calendar, 
  Filter, 
  StickyNote, 
  FileText, 
  Database 
} from 'lucide-react';


const nodeIcons = {
  customInput: ArrowRightToLine,
  llm: BrainCircuit,
  customOutput: ArrowLeftToLine,
  text: Type,
  date: Calendar,
  filter: Filter,
  note: StickyNote,
  transform: FileText,
  database: Database,
};

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="pipeline-toolbar-content">
                <DraggableNode type='customInput' label='Input' icon={nodeIcons.customInput} />
                <DraggableNode type='llm' label='LLM' icon={nodeIcons.llm} />
                <DraggableNode type='customOutput' label='Output' icon={nodeIcons.customOutput} />
                <DraggableNode type='text' label='Text' icon={nodeIcons.text} />
                <DraggableNode type='date' label='Date' icon={nodeIcons.date} />
                <DraggableNode type='filter' label='Filter' icon={nodeIcons.filter} />
                <DraggableNode type='note' label='Note' icon={nodeIcons.note} />
                <DraggableNode type='transform' label='Transform' icon={nodeIcons.transform} />
                <DraggableNode type='database' label='Database' icon={nodeIcons.database} />
            </div>
        </div>
    );
};
