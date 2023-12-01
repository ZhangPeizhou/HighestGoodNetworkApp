<<<<<<< HEAD
import ReportBlock from '../ReportBlock/ReportBlock';

import './ReportCard.css';

export default function ReportCard() {
=======
import { ReportBlock } from '../ReportBlock';
import './ReportCard.css';

export function ReportCard() {
>>>>>>> Zijie_Fix_Report_Lint_Phase10
  return (
    <ReportBlock>
      <div className="report-card">
        <h3>100</h3>
        <p>Here is the card name</p>
      </div>
    </ReportBlock>
  );
}
