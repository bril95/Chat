import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return <h3>{t('notFoundPage.pageNotFound')}</h3>;
};

export default NotFound;