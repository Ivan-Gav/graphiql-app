import { Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { getDocState, closeDocs } from 'src/store/slice/DocSlice';

const drawerWidth = '300px';

type DrawerProps = {
  container: HTMLElement | null;
  children: React.ReactNode;
  drawerVariant?: 'desktop' | 'mobile';
};

export default function DrawerLeft(props: DrawerProps) {
  const { children, container, drawerVariant } = props;
  const { docsOpen } = useAppSelector(getDocState);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        overflow: 'hidden',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'absolute',
          borderWidth: 0,
        },
      }}
      ModalProps={{
        container: container,
        disableAutoFocus: true,
        style: { position: 'absolute' },
      }}
      variant={drawerVariant === 'mobile' ? 'temporary' : 'persistent'}
      // variant={'persistent'}
      anchor="left"
      open={docsOpen}
      onClose={() => dispatch(closeDocs())}
      elevation={2}
    >
      {children}
    </Drawer>
  );
}
