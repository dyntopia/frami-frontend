import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const Save = (props) => {
  const { t } = useTranslation();

  return (
    <Button
      fullWidth
      aria-label={t('save')}
      variant="contained"
      color="primary"
      type="submit"
      {...props}
    >
      {t('label.save')}
    </Button>
  );
};

export { Save };
