import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import DocumentationExplorer from '../../components/DocumentationExplorer/DocumentationExplorer';
import RequestEditor from '../../components/RequestEditor/RequestEditor';
import RequestMenu from '../../components/RequestMenu/RequestMenu';
import ResponseSection from '../../components/ResponseSection/ResponseSection';

export default function GraphiQLPage() {
  return (
    <>
      <Typography variant="h1" sx={{ p: 2 }}>
        GraphiQLPage
      </Typography>
      <Grid container justifyContent="space-between" sx={{ p: 2 }}>
        <Grid item xs={3} sx={{ p: 1 }}>
          <DocumentationExplorer />
        </Grid>
        <Grid item xs={5} sx={{ p: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Grid container>
              <Grid item xs={12}>
                <RequestEditor />
              </Grid>
              <Grid item xs={12}>
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
