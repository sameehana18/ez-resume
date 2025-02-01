import React from "react";

function Certifications({ resumeInfo }) {
  return (
    <div className="my-3">
      <h2 className="text-sm font-normal">CERTIFICATIONS</h2>
      <hr className="my-1 border-[0.5px] border-gray-400" />
      <div>
        {resumeInfo?.certifications && resumeInfo.certifications.length > 0 ? (
          resumeInfo.certifications.map((cert, index) => (
            <div className="flex justify-between" key={index}>
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold"
              >
                {cert.certificateName}
              </a>
              <h2 className="text-sm">{cert.issuedBy}</h2>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No certifications available</p>
        )}
      </div>
    </div>
  );
}

export default Certifications;
