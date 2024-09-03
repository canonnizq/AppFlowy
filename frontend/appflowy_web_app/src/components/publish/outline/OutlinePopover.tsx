import { usePublishContext } from '@/application/publish';
import Outline from '@/components/publish/outline/Outline';
import { Divider, PopperPlacementType } from '@mui/material';
import React, { ReactElement, useMemo } from 'react';
import { RichTooltip } from '@/components/_shared/popover';
import { ReactComponent as AppFlowyLogo } from '@/assets/appflowy.svg';

export function OutlinePopover ({
  children,
  open,
  onClose,
  placement,
  onMouseEnter,
  onMouseLeave,
  drawerWidth,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
  placement?: PopperPlacementType;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  drawerWidth: number;
}) {
  const viewMeta = usePublishContext()?.viewMeta;

  const content = useMemo(() => {
    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}

        className={'flex h-fit max-h-[500px] flex-col overflow-y-auto overflow-x-hidden pb-2'}
      >
        <Outline width={drawerWidth} />

        <div
          style={{
            position: 'sticky',
            bottom: 0,
            width: '100%',
            height: '44px',
          }}
          className={'flex flex-col items-center justify-center gap-3 bg-bg-body'}
        >
          {Boolean(viewMeta?.child_views?.length) && <Divider className={'w-full'} />}

          <div
            onClick={() => {
              window.open('https://appflowy.io', '_blank');
            }}
            className={
              'flex w-full cursor-pointer gap-2 items-center justify-center py-2 text-sm text-text-title opacity-50'
            }
          >
            Powered by
            <AppFlowyLogo className={'w-[88px]'} />
          </div>
        </div>
      </div>
    );
  }, [onMouseEnter, onMouseLeave, viewMeta, drawerWidth]);

  return (
    <RichTooltip PaperProps={{
      className: 'rounded-[14px] border border-tint-purple bg-bg-body m-2 overflow-hidden',
    }} open={open} onClose={onClose} content={content} placement={placement}
    >
      {children}
    </RichTooltip>
  );
}

export default OutlinePopover;
