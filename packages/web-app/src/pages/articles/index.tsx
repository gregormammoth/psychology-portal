import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { Layout } from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import theme from '../../theme';
import { mockArticles } from '@/model/constants';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
});

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

const ArticlesPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const categories = [
    { value: 'all', label: t('articles.categories.all') },
    { value: 'anxiety', label: t('articles.categories.anxiety') },
    { value: 'depression', label: t('articles.categories.depression') },
    { value: 'relationships', label: t('articles.categories.relationships') },
    { value: 'mindfulness', label: t('articles.categories.mindfulness') },
    { value: 'selfEsteem', label: t('articles.categories.selfEsteem') },
    { value: 'trauma', label: t('articles.categories.trauma') },
    { value: 'lifeTransitions', label: t('articles.categories.lifeTransitions') },
    { value: 'autism', label: t('articles.categories.autism') },
  ];

  const sortOptions = [
    { value: 'newest', label: t('articles.filters.sortOptions.newest') },
    { value: 'oldest', label: t('articles.filters.sortOptions.oldest') },
    { value: 'popular', label: t('articles.filters.sortOptions.popular') },
    { value: 'relevance', label: t('articles.filters.sortOptions.relevance') },
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleReadMore = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  return (
    <>
      <SEO
        title={t('seo.pages.articles.title')}
        description={t('seo.pages.articles.description')}
        keywords={t('seo.pages.articles.keywords')}
        url="https://psychologyportal.com/ru/articles"
        locale="ru"
      />
      <Layout
        title={`${t('articles.title')} - ${t('menu.portalName')}`}
        description={t('articles.description')}
      >
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 4
              }}
            >
              {t('articles.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              paragraph
              sx={{
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                mb: 6
              }}
            >
              {t('articles.description')}
            </Typography>

            <FilterSection sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 3,
              mb: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)'
            }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder={t('articles.search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>{t('articles.categories.all')}</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      label={t('articles.categories.all')}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.light',
                        },
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>{t('articles.filters.sortBy')}</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label={t('articles.filters.sortBy')}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.light',
                        },
                      }}
                    >
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSortBy('newest');
                    }}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                      },
                    }}
                  >
                    {t('articles.filters.reset')}
                  </Button>
                </Grid>
              </Grid>
            </FilterSection>

            <Grid container spacing={4}>
              {mockArticles.map((article) => (
                <Grid item key={article.id} xs={12} sm={6} md={4}>
                  <StyledCard sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}>
                    <StyledCardMedia
                      image={article.image}
                      title={article.title}
                      sx={{
                        height: 220,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                      }}
                    />
                    <CardContent sx={{
                      flexGrow: 1,
                      p: 3,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                    }}>
                      <Chip
                        label={t(`articles.categories.${article.category}`)}
                        size="small"
                        sx={{
                          mb: 2,
                          backgroundColor: 'primary.light',
                          color: 'primary.dark',
                          fontWeight: 'medium',
                        }}
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 2,
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        {article.description}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          mb: 3,
                          color: 'text.secondary',
                        }}
                      >
                        <Typography variant="caption">
                          {t('articles.readingTime', { minutes: article.readingTime })}
                        </Typography>
                        <Typography variant="caption">•</Typography>
                        <Typography variant="caption">
                          {t('articles.author', { name: article.author })}
                        </Typography>
                      </Stack>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleReadMore(article.id)}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: 3,
                          },
                        }}
                      >
                        {t('articles.readMore')}
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={5}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          </Container>
        </ThemeProvider>
      </Layout>
    </>
  );
};

export default ArticlesPage; 