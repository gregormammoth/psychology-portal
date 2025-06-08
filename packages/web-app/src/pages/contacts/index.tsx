import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Layout } from '../../components/layout/Layout';
import { Container, Typography, Box, TextField, Button, Grid, Alert, Snackbar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

interface ConsultationFormData {
  title: string;
  description: string;
  duration: number;
  price: number;
  psychologistId: string;
  type: 'online' | 'offline';
  tags?: string[];
  availableTimeSlots?: string[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

const ContactsPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationFormData>();

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Get the token from localStorage
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   router.push('/auth/login');
      //   return;
      // }

      // Send the consultation request to the psy-service via gateway
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/psy/consultations`,
        {
          ...data,
          price: Number(data.price),
          duration: Number(data.duration),
          psychologistId: '1',
          status: 'available',
        },
      );
      // await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/psy/consultations`,
      //   data,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      setSuccess(true);
      // Reset form or redirect
      setTimeout(() => {
        router.push('/consultations');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title={`${t('contacts.title')} - ${t('menu.portalName')}`}
      description={t('contacts.description')}
    >
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          {t('contacts.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph align="center">
          {t('contacts.description')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('contacts.form.title')}
                {...register('title', { required: true })}
                error={!!errors.title}
                helperText={errors.title && t('contacts.form.required')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('contacts.form.description')}
                {...register('description', { required: true })}
                error={!!errors.description}
                helperText={errors.description && t('contacts.form.required')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label={t('contacts.form.duration')}
                {...register('duration', { required: true, min: 15 })}
                error={!!errors.duration}
                helperText={errors.duration && t('contacts.form.required')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label={t('contacts.form.price')}
                {...register('price', { required: true, min: 0 })}
                error={!!errors.price}
                helperText={errors.price && t('contacts.form.required')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label={t('contacts.form.type')}
                {...register('type', { required: true })}
                error={!!errors.type}
                helperText={errors.type && t('contacts.form.required')}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="online">{t('contacts.form.typeOnline')}</option>
                <option value="offline">{t('contacts.form.typeOffline')}</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contacts.form.submitting') : t('contacts.form.submit')}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success" onClose={() => setSuccess(false)}>
            {t('contacts.form.success')}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default ContactsPage;