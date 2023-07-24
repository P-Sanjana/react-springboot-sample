package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.PaymentMethodDTO;

public interface PaymentService {

    boolean initiatePayment(PaymentMethodDTO paymentMethod);
}
