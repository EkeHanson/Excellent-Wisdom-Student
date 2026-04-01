import React from 'react'
import ConstitutionSection from './ConstitutionSection'

function DocumentsSection({ certificatePdf, statusReportPdf, meetingMinutePdf }) {
  return (
    <>
      <section className="section docs">
        <h2>Important Documents</h2>
        <p>Open the files below to review the organization's certificate, status report, and meeting minutes.</p>
        <ul>
          <li>
            <a href={certificatePdf} target="_blank" rel="noreferrer">
              Certificate - Excellent Wisdom Students NGO 2013 Alumni Association
            </a>
          </li>
          <li>
            <a href={statusReportPdf} target="_blank" rel="noreferrer">
              Status Report CAC - Excellent Wisdom Students NGO 2013 Alumni Association
            </a>
          </li>
          <li>
            <a href={meetingMinutePdf} target="_blank" rel="noreferrer">
              AWS Meeting Minute
            </a>
          </li>
        </ul>
      </section>

      <ConstitutionSection />
    </>
  )
}

export default DocumentsSection
