import { Grid, Paper, Typography } from '@mui/material';
import RequestEditor from '../../components/RequestEditor/RequestEditor';
import RequestMenu from '../../components/RequestMenu/RequestMenu';
import ResponseSection from '../../components/ResponseSection/ResponseSection';
import InputApi from 'src/components/InputApi/InputApi';
import { Suspense, lazy } from 'react';

const DocumentationExplorer = lazy(
  () => import('../../components/DocumentationExplorer/DocumentationExplorer')
);

export default function GraphiQLPage() {
  return (
    <>
      <Typography variant="h1" sx={{ p: 2 }}>
        GraphiQLPage
      </Typography>
      <InputApi />
      <Grid container justifyContent="space-between" sx={{ p: 2 }}>
        <Grid item xs={3} sx={{ p: 1 }}>
          <Suspense fallback={<h2>Loading schema...</h2>}>
            <DocumentationExplorer />
          </Suspense>
        </Grid>
        <Grid item xs={5} sx={{ p: 1 }}>
          <Paper sx={{ p: 1 }}>
            <Grid container>
              <Grid item xs={12} sx={{ p: 1 }}>
                <RequestEditor />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <RequestMenu />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4} sx={{ p: 1 }}>
          <Paper sx={{ p: 2 }}>
            <ResponseSection />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
