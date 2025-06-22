import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  Chip,
  Stack,
  Button,
  Divider,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import { Layout } from '../../components/Layout/Layout';
import theme from '../../theme';

const ArticleHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
}));

const ArticleImage = styled(CardMedia)(({ theme }) => ({
  height: 400,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

const ArticleContent = styled(Box)(({ theme }) => ({
  '& h2': {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  '& h3': {
    color: theme.palette.primary.dark,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
    lineHeight: 1.6,
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontStyle: 'italic',
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
}));

const RelatedArticlesSection = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const RelatedArticleItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const mockArticles = {
  1: {
    id: 1,
    title: 'Understanding and Managing Anxiety in Daily Life',
    description: 'Learn practical strategies to cope with anxiety and improve your mental well-being through evidence-based techniques.',
    image: '/images/anxiety.jpg',
    category: 'anxiety',
    readingTime: 5,
    author: 'Dr. Sarah Johnson',
    date: '2024-03-15',
    content: `
      <h2>What is Anxiety?</h2>
      <p>Anxiety is a natural response to stress and can be beneficial in some situations. It can alert us to dangers and help us prepare and pay attention. However, when anxiety becomes excessive, it may fall under the classification of an anxiety disorder.</p>
      
      <p>Anxiety disorders are different from normal anxiety in that they involve excessive fear or anxiety. They are the most common mental health conditions and affect millions of people worldwide.</p>

      <h3>Common Symptoms of Anxiety</h3>
      <ul>
        <li>Feeling restless, wound-up, or on-edge</li>
        <li>Being easily fatigued</li>
        <li>Having difficulty concentrating</li>
        <li>Being irritable</li>
        <li>Having muscle tension</li>
        <li>Difficulty controlling feelings of worry</li>
        <li>Having sleep problems</li>
      </ul>

      <h2>Effective Strategies for Managing Anxiety</h2>
      
      <h3>1. Deep Breathing Exercises</h3>
      <p>Deep breathing is one of the best ways to lower stress in the body. When you breathe deeply, it sends a message to your brain to calm down and relax.</p>
      
      <blockquote>
        "Take a moment to breathe. In times of stress, our breath becomes shallow. Deep breathing helps activate the body's relaxation response."
      </blockquote>

      <h3>2. Progressive Muscle Relaxation</h3>
      <p>This technique involves tensing and then relaxing different muscle groups in your body. It helps you become more aware of physical sensations and learn to relax.</p>

      <h3>3. Mindfulness and Meditation</h3>
      <p>Mindfulness practices can help you stay grounded in the present moment and reduce anxiety about future events or past experiences.</p>

      <h2>When to Seek Professional Help</h2>
      <p>If anxiety is interfering with your daily life, relationships, or work, it may be time to seek professional help. A mental health professional can provide you with the tools and support you need to manage your anxiety effectively.</p>

      <p>Remember, seeking help is a sign of strength, not weakness. With the right support and strategies, anxiety can be managed effectively.</p>
    `,
    tags: ['anxiety', 'mental health', 'coping strategies', 'self-care'],
  },
  2: {
    id: 2,
    title: 'Building Healthy Relationships: A Guide to Better Connections',
    description: 'Discover the key elements of maintaining healthy relationships and improving communication with loved ones.',
    image: '/images/relationships.jpg',
    category: 'relationships',
    readingTime: 7,
    author: 'Dr. Michael Chen',
    date: '2024-03-14',
    content: `
      <h2>The Foundation of Healthy Relationships</h2>
      <p>Healthy relationships are built on mutual respect, trust, and effective communication. They require effort from both parties and involve give and take.</p>
      
      <h3>Key Components of Healthy Relationships</h3>
      <ul>
        <li>Trust and honesty</li>
        <li>Respect for boundaries</li>
        <li>Open communication</li>
        <li>Emotional support</li>
        <li>Shared values and goals</li>
        <li>Independence and interdependence</li>
      </ul>

      <h2>Communication Strategies</h2>
      <p>Effective communication is the cornerstone of any healthy relationship. It involves not just speaking, but also listening actively and empathetically.</p>

      <h3>Active Listening Techniques</h3>
      <p>Active listening means fully concentrating on what the other person is saying, both verbally and non-verbally. It involves:</p>
      <ul>
        <li>Giving your full attention</li>
        <li>Avoiding interruptions</li>
        <li>Asking clarifying questions</li>
        <li>Reflecting back what you heard</li>
        <li>Showing empathy and understanding</li>
      </ul>

      <blockquote>
        "The most important thing in communication is hearing what isn't said." - Peter Drucker
      </blockquote>

      <h2>Managing Conflict</h2>
      <p>Conflict is natural in any relationship. The key is learning how to handle disagreements in a healthy, constructive way.</p>

      <h3>Healthy Conflict Resolution</h3>
      <p>When conflicts arise, focus on the issue at hand rather than attacking the person. Use "I" statements to express your feelings and needs without blaming the other person.</p>
    `,
    tags: ['relationships', 'communication', 'conflict resolution', 'trust'],
  },
  3: {
    id: 3,
    title: 'Mindfulness Meditation: A Path to Inner Peace',
    description: 'Explore the benefits of mindfulness meditation and learn simple techniques to incorporate into your daily routine.',
    image: '/images/mindfulness.jpg',
    category: 'mindfulness',
    readingTime: 4,
    author: 'Dr. Emma Wilson',
    date: '2024-03-13',
    content: `
      <h2>What is Mindfulness?</h2>
      <p>Mindfulness is the practice of purposeful, non-judgmental awareness of the present moment. It involves paying attention to your thoughts, feelings, and surroundings without getting caught up in them.</p>

      <h3>Benefits of Mindfulness Meditation</h3>
      <ul>
        <li>Reduced stress and anxiety</li>
        <li>Improved focus and concentration</li>
        <li>Better emotional regulation</li>
        <li>Enhanced self-awareness</li>
        <li>Improved sleep quality</li>
        <li>Increased compassion and empathy</li>
      </ul>

      <h2>Simple Mindfulness Techniques</h2>
      
      <h3>1. Breath Awareness</h3>
      <p>Focus your attention on your breath. Notice the sensation of air entering and leaving your nostrils. When your mind wanders, gently bring your attention back to your breath.</p>

      <h3>2. Body Scan</h3>
      <p>Starting from your toes, slowly move your attention up through your body, noticing any sensations, tension, or relaxation in each part.</p>

      <blockquote>
        "Mindfulness is about being fully awake in our lives. It is about perceiving the exquisite vividness of each moment."
      </blockquote>

      <h2>Incorporating Mindfulness into Daily Life</h2>
      <p>You don't need to set aside hours for meditation. Even a few minutes of mindful breathing or awareness can make a significant difference in your day.</p>
    `,
    tags: ['mindfulness', 'meditation', 'stress relief', 'present moment'],
  },
};

const relatedArticles = [
  { id: 2, title: 'Building Healthy Relationships: A Guide to Better Connections', readingTime: 7 },
  { id: 3, title: 'Mindfulness Meditation: A Path to Inner Peace', readingTime: 4 },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'ru', 'sr'];
  const paths: Array<{ params: { id: string }; locale: string }> = [];

  locales.forEach((locale) => {
    Object.keys(mockArticles).forEach((id) => {
      paths.push({
        params: { id },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const id = params?.id as string;
  const articleId = parseInt(id, 10);
  const article = mockArticles[articleId as keyof typeof mockArticles];

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

interface ArticleDetailProps {
  article: typeof mockArticles[keyof typeof mockArticles];
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleBackToArticles = () => {
    router.push('/articles');
  };

  const handleRelatedArticleClick = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (category: string) => {
    return t(`articles.categories.${category}`);
  };

  return (
    <Layout
      title={`${article.title} - ${t('menu.portalName')}`}
      description={article.description}
    >
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToArticles}
            sx={{ mb: 3, color: 'primary.main' }}
          >
            Back to Articles
          </Button>

          <ArticleHeader>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              {article.title}
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              sx={{ mb: 3, lineHeight: 1.5 }}
            >
              {article.description}
            </Typography>

            <MetaInfo>
              <MetaItem>
                <PersonIcon fontSize="small" />
                <Typography variant="body2">
                  {t('articles.author', { name: article.author })}
                </Typography>
              </MetaItem>
              <MetaItem>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">
                  {t('articles.publishedOn', { date: formatDate(article.date) })}
                </Typography>
              </MetaItem>
              <MetaItem>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">
                  {t('articles.readingTime', { minutes: article.readingTime })}
                </Typography>
              </MetaItem>
              <Chip
                label={getCategoryLabel(article.category)}
                color="primary"
                variant="outlined"
                size="small"
              />
            </MetaInfo>

            <ActionButtons>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShare}
                size="small"
              >
                Share
              </Button>
              <Button
                variant="outlined"
                startIcon={<BookmarkIcon />}
                size="small"
              >
                Bookmark
              </Button>
            </ActionButtons>
          </ArticleHeader>

          {article.image && (
            <ArticleImage
              image={article.image}
              title={article.title}
            />
          )}

          <ArticleContent>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </ArticleContent>

          <Divider sx={{ my: 4 }} />

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
            {article.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>

          <RelatedArticlesSection>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {t('articles.relatedArticles')}
            </Typography>
            <Stack spacing={2}>
              {relatedArticles
                .filter((related) => related.id !== article.id)
                .slice(0, 2)
                .map((related) => (
                  <RelatedArticleItem
                    key={related.id}
                    onClick={() => handleRelatedArticleClick(related.id)}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 500,
                          mb: 0.5,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {related.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('articles.readingTime', { minutes: related.readingTime })}
                      </Typography>
                    </Box>
                  </RelatedArticleItem>
                ))}
            </Stack>
          </RelatedArticlesSection>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default ArticleDetail; 