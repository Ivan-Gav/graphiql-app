import { Grid, Paper } from '@mui/material';
import RequestEditor from '../../components/RequestEditor/RequestEditor';
import RequestMenu from '../../components/RequestMenu/RequestMenu';
import ResponseSection from '../../components/ResponseSection/ResponseSection';
import InputApi from 'src/components/InputApi/InputApi';
import { Suspense, lazy, useRef } from 'react';
import DrawerLeft from 'src/components/DocumentationExplorer/DrawerLeft';
import { useAppSelector } from 'src/hooks/redux';
import { getDocState } from 'src/store/slice/DocSlice';
// import theme from 'src/themes/theme';

const DocumentationExplorer = lazy(
  () => import('../../components/DocumentationExplorer/DocumentationExplorer')
);

export default function GraphiQLPage() {
  const contRef = useRef(null);
  const { docsOpen } = useAppSelector(getDocState);

  return (
    <>
      <InputApi />
      <Grid container sx={{ py: 2 }}>
        <Grid
          item
          xs={12}
          display="grid"
          gridTemplateColumns={docsOpen ? '380px 1fr 1fr' : '0 1fr 1fr'}
          sx={{ transition: '.5s' }}
          alignItems="stretch"
        >
          <Grid container position="relative" ref={contRef} overflow="hidden">
            <DrawerLeft container={contRef.current}>
              <Suspense fallback={<h2>Loading schema...</h2>}>
                <DocumentationExplorer />
              </Suspense>
            </DrawerLeft>
          </Grid>

          <Grid container overflow="auto" pl={docsOpen ? 2 : 0}>
            <Paper sx={{ p: 1, width: '100%' }}>
              <Grid item xs={12} sx={{ p: 1 }}>
                <RequestEditor />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <RequestMenu />
              </Grid>
            </Paper>
          </Grid>

          <Grid container overflow="auto" pl={2}>
            <Paper sx={{ p: 2, width: '100%' }}>
              <ResponseSection />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
