import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faClock, faUpload } from '@fortawesome/fontawesome-free-solid';

const shorten = originalName =>
  (originalName.length > 44 ? `${originalName.slice(0, 44)}...` : originalName);

/**
 * COMPONENT
 */
export default (props) => {
  const { active } = props;

  let seedClass = 'seed';
  let leachClass = 'leach';
  let ratioClass = 'ratio';

  switch (active) {
    case 'seed':
      seedClass += ' active';
      break;
    case 'leach':
      leachClass += ' active';
      break;
    case 'ratio':
      ratioClass += ' active';
      break;
  }

  return (
    <div className="dl-item">
      <div className="number">#</div>

      <div className="name">name</div>

      <div className="group-holder">
        <div className="group">
          <div className={seedClass}>seed</div>
          <div className={leachClass}>leach</div>
        </div>
        <div className="group">
          <div className={ratioClass}>ratio</div>
          <div className="uploadedDate">uploaded</div>
        </div>
      </div>
    </div>
  );
};