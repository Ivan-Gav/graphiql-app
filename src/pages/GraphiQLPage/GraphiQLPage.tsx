import { CircularProgress, Grid, Paper } from '@mui/material';
import RequestEditor from '../../components/RequestEditor/RequestEditor';
import RequestMenu from '../../components/RequestMenu/RequestMenu';
import ResponseSection from '../../components/ResponseSection/ResponseSection';
import InputApi from 'src/components/InputApi/InputApi';
import { Suspense, lazy, useRef } from 'react';
import DrawerLeft from 'src/components/DocumentationExplorer/DrawerLeft';

const DocumentationExplorer = lazy(
  () => import('../../components/DocumentationExplorer/DocumentationExplorer')
);

export default function GraphiQLPage() {
  const contRef = useRef(null);

  return (
    <>
      <InputApi />
      <Grid container justifyContent="space-between" sx={{ py: 2 }}>
        <Grid item xs={3} p={1}>
          <Grid
            ref={contRef}
            position="relative"
            overflow="hidden"
            height="100%"
          >
            <DrawerLeft container={contRef.current}>
              <Suspense fallback={<CircularProgress />}>
                <DocumentationExplorer />
              </Suspense>
            </DrawerLeft>
          </Grid>
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
