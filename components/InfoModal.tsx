/**
 * @file InfoModal.tsx
 * @description
 * This component is a popup window ("modal") that provides a brief, introductory
 * guide to the NBA OBE Portal. It's designed to be shown from the login screen
 * to help new users understand the application's purpose, features, and user roles.
 */

import React from 'react';
import Modal from './Modal'; // Use our generic "popup" component as a base.

// This defines the "props" or properties this component needs from its parent.
interface InfoModalProps {
  onClose: () => void; // A function to call to close the popup.
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    // We use our reusable `Modal` component as the frame for our popup.
    <Modal title="About the NBA OBE Portal" onClose={onClose}>
      <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-gray-700">
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Welcome!</h3>
          <p>
            The NBA Outcome Based Education (OBE) Portal is a comprehensive tool designed for educational institutions to manage, track, and automate the complex process of calculating Course Outcome (CO) and Program Outcome (PO) attainment, in line with NBA guidelines.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Key Features</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Automated Attainment Calculation:</strong> Eliminates manual spreadsheets for CO and PO attainment.</li>
            <li><strong>Centralized Data Management:</strong> A single source of truth for curriculum, faculty, students, and assessments.</li>
            <li><strong>Role-Based Access:</strong> A secure system where each user only sees what's relevant to their role.</li>
            <li><strong>Streamlined Workflows:</strong> Easy-to-use interfaces for managing courses, defining outcomes, and uploading marks.</li>
            <li><strong>Report Generation:</strong> Download professional, print-ready PDF reports for accreditation and review.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2">User Roles & Responsibilities</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Administrator</h4>
              <p className="text-sm">The system superuser. Manages the entire academic structure (colleges, programs), all user accounts, and system-wide default settings.</p>
            </div>
            <div>
              <h4 className="font-semibold">Department Head</h4>
              <p className="text-sm">Manages a specific college/department. Responsible for assigning Program Co-ordinators to programs and teachers to their respective PCs. Also manages student section assignments.</p>
            </div>
            <div>
              <h4 className="font-semibold">Program Co-ordinator (PC)</h4>
              <p className="text-sm">Manages an entire academic program. Defines POs, creates courses, manages COs, assigns teachers to courses, and oversees the entire attainment process for their program.</p>
            </div>
            <div>
              <h4 className="font-semibold">Teacher</h4>
              <p className="text-sm">Manages their assigned courses. Defines COs, creates assessments, maps questions to COs, uploads student marks, and views attainment results for their classes.</p>
            </div>
          </div>
        </section>
        
        <div className="pt-4 text-center">
            <button type="button" onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
                Got it!
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;