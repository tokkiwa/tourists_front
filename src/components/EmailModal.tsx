import React from 'react';
import { EmailInfo } from '../services/api';
import './EmailModal.css';

interface EmailModalProps {
    email: EmailInfo;
    onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ email, onClose }) => {
    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'short',
        });
    };

    const getSenderTypeClass = (senderEmail: string) => {
        if (senderEmail.includes('amazon')) return 'amazon';
        if (senderEmail.includes('vpass')) return 'credit-card';
        if (senderEmail.includes('gmail')) return 'personal';
        return 'other';
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className={`modal-content ${getSenderTypeClass(email.sender_email)}`}>
                <div className="modal-header">
                    <div className="modal-title">
                        <h2>メール詳細</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="email-meta">
                        <div className="meta-row">
                            <span className="meta-label">送信者:</span>
                            <span className="meta-value sender">
                                {email.sender_raw}
                            </span>
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">メールアドレス:</span>
                            <span className="meta-value">{email.sender_email}</span>
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">件名:</span>
                            <span className="meta-value subject">{email.subject}</span>
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">受信日時:</span>
                            <span className="meta-value">{formatDate(email.timestamp)}</span>
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">メッセージID:</span>
                            <span className="meta-value message-id">{email.message_id}</span>
                        </div>
                    </div>

                    <div className="email-body-full">
                        <h3>メール本文</h3>
                        <div className="body-content">
                            <pre>{email.body}</pre>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;
