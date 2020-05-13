import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { translations } from '../utils/translations';

export const InformationPopover = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button
        type="button"
        id="infoPopover"
        className="btn-sm btn-light btn-outline-secondary"
        size="sm"
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '1rem',
          fontWeight: '600',
          fontSize: '1rem',
          marginRight: '3rem',
        }}
      >
        ?
      </Button>
      <Popover
        className="mw-100"
        style={{ whiteSpace: 'pre-line' }}
        placement="bottom"
        trigger="legacy"
        hideArrow={false}
        isOpen={popoverOpen}
        target="infoPopover"
        toggle={toggle}
      >
        <PopoverHeader>{translations[props.language.code].loginForm.aboutH}</PopoverHeader>
        <PopoverBody>{translations[props.language.code].loginForm.about}</PopoverBody>
      </Popover>
    </div>
  );
};

InformationPopover.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
};

const mapStateToProps = store => ({
  language: store.settings.language,
});

export default connect(mapStateToProps)(InformationPopover);
